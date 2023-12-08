import React, { useContext, useEffect, useRef, useState } from 'react';
import { over } from 'stompjs';
import SockJS from 'sockjs-client';
import './ChatRoom.css';
import { apiClient, baseUrl } from './security/apiClient';
import { StateContext } from '../App';
import { useNavigate } from 'react-router-dom';

let stompClient = null;
const ChatRoom = () => {
    const [privateChats, setPrivateChats] = useState(new Map());
    const [publicChats, setPublicChats] = useState([]);
    const [tab, setTab] = useState('CHATROOM');
    const { cookies, currentMember, isLoggedIn } = useContext(StateContext);
    const [tabNotifications, setTabNotifications] = useState({});
    const [userData, setUserData] = useState({
        username: currentMember.nickname,
        receivername: '',
        connected: false,
        message: '',
    });
    const chatContainerRef = useRef(null);
    const navigate = useNavigate();

    // 특정 조건에서 스크롤을 아래로 이동시키는 함수
    const scrollToBottom = () => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop =
                chatContainerRef.current.scrollHeight;
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [publicChats, privateChats]);

    const connect = () => {
        let Sock = new SockJS(baseUrl + '/ws');
        stompClient = over(Sock);
        stompClient.connect(
            { Authorization: cookies.accessToken },
            onConnected,
            onError
        );
    };

    const onConnected = () => {
        setUserData({ ...userData, connected: true });
        stompClient.subscribe('/chatroom/public', onMessageReceived);
        stompClient.subscribe(
            '/user/' + userData.username + '/private',
            onPrivateMessage
        );
        userJoin();
    };

    const userJoin = () => {
        let chatMessage = {
            senderName: userData.username,
            status: 'JOIN',
        };
        stompClient.send('/app/message', {}, JSON.stringify(chatMessage));
    };

    const onMessageReceived = (payload) => {
        let payloadData = JSON.parse(payload.body);
        switch (payloadData.status) {
            case 'JOIN':
                if (!privateChats.get(payloadData.senderName)) {
                    privateChats.set(payloadData.senderName, []);
                    setPrivateChats(new Map(privateChats));
                }
                break;
            case 'MESSAGE':
                publicChats.push(payloadData);
                setPublicChats([...publicChats]);
                if (payloadData.senderName !== userData.username) {
                    setTabNotifications((prev) => ({
                        ...prev,
                        [payloadData.senderName]: true,
                    }));
                }
                break;
            default:
        }
    };

    const onPrivateMessage = (payload) => {
        console.log(payload);
        let payloadData = JSON.parse(payload.body);
        if (privateChats.get(payloadData.senderName)) {
            privateChats.get(payloadData.senderName).push(payloadData);
            setPrivateChats(new Map(privateChats));
        } else {
            let list = [];
            list.push(payloadData);
            privateChats.set(payloadData.senderName, list);
            setPrivateChats(new Map(privateChats));
        }
        if (payloadData.senderName !== userData.username) {
            setTabNotifications((prev) => ({
                ...prev,
                [payloadData.senderName]: true,
            }));
        }
    };
    const handleTabClick = (tabName) => {
        setTabNotifications((prev) => ({
            ...prev,
            [tabName]: false,
        }));
        setTab(tabName);
    };

    const onError = (err) => {
        console.log(err);
    };

    const handleMessage = (event) => {
        const { value } = event.target;
        setUserData({ ...userData, message: value });
    };
    const sendValue = () => {
        if (stompClient) {
            let chatMessage = {
                senderName: userData.username,
                message: userData.message,
                status: 'MESSAGE',
            };
            if (chatMessage.message.trim() === '') {
                setUserData({ ...userData, message: '' });
                return;
            }
            console.log(chatMessage);
            stompClient.send('/app/message', {}, JSON.stringify(chatMessage));
            setUserData({ ...userData, message: '' });
        }
    };

    const sendPrivateValue = () => {
        if (stompClient) {
            let chatMessage = {
                senderName: userData.username,
                receiverName: tab,
                message: userData.message,
                status: 'MESSAGE',
            };
            if (chatMessage.message.trim() === '') {
                setUserData({ ...userData, message: '' });
                return;
            }

            if (userData.username !== tab) {
                privateChats.get(tab).push(chatMessage);
                setPrivateChats(new Map(privateChats));
            }
            stompClient.send(
                '/app/private-message',
                {},
                JSON.stringify(chatMessage)
            );
            setUserData({ ...userData, message: '' });
        }
    };

    const handleUsername = (event) => {
        const { value } = event.target;
        setUserData({ ...userData, username: value });
    };
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            sendValue();
        }
    };
    const handleKeyPressPrivate = (e) => {
        if (e.key === 'Enter') {
            sendPrivateValue();
        }
    };

    const registerUser = () => {
        if (!isLoggedIn) {
            alert('로그인이 필요합니다.');
            navigate('/login');
        }
        if (userData.username === '') {
            alert('정상적인 접근이 아닙니다.');
            navigate('/');
        }

        connect();
    };
    return (
        <div className='container'>
            {userData.connected ? (
                <div className='chat-box'>
                    <div className='member-list'>
                        <ul>
                            <li
                                onClick={() => {
                                    handleTabClick('CHATROOM');
                                }}
                                className={`member ${
                                    tab === 'CHATROOM' && 'active'
                                }`}
                            >
                                Chatroom
                                {tabNotifications['CHATROOM'] && (
                                    <span className='notification-dot'></span>
                                )}
                            </li>
                            {[...privateChats.keys()].map((name, index) => (
                                <li
                                    onClick={() => {
                                        handleTabClick(name);
                                    }}
                                    className={`member ${
                                        tab === name && 'active'
                                    }`}
                                    key={index}
                                >
                                    {name}
                                    {tabNotifications[name] && (
                                        <span className='notification-dot'></span>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                    {tab === 'CHATROOM' && (
                        <div className='chat-content'>
                            <ul
                                ref={chatContainerRef}
                                className={'chat-messages'}
                            >
                                {publicChats.map((chat, index) => (
                                    <li
                                        className={`message ${
                                            chat.senderName ===
                                                userData.username && 'self'
                                        }`}
                                        key={index}
                                    >
                                        {chat.senderName !==
                                            userData.username && (
                                            <div className='avatar'>
                                                {chat.senderName}
                                            </div>
                                        )}
                                        <div className='message-data'>
                                            {chat.message}
                                        </div>
                                        {chat.senderName ===
                                            userData.username && (
                                            <div className='avatar self'>
                                                {chat.senderName}
                                            </div>
                                        )}
                                    </li>
                                ))}
                            </ul>

                            <div className='send-message'>
                                <input
                                    type='text'
                                    className='input-message'
                                    placeholder='메시지를 입력하세요'
                                    value={userData.message}
                                    onChange={handleMessage}
                                    onKeyDown={handleKeyPress}
                                />
                                <button
                                    type='button'
                                    className='send-button'
                                    onClick={sendValue}
                                >
                                    전송
                                </button>
                            </div>
                        </div>
                    )}
                    {tab !== 'CHATROOM' && (
                        <div className='chat-content'>
                            <ul
                                ref={chatContainerRef}
                                className={'chat-messages'}
                            >
                                {[...privateChats.get(tab)].map(
                                    (chat, index) => (
                                        <li
                                            className={`message ${
                                                chat.senderName ===
                                                    userData.username && 'self'
                                            }`}
                                            key={index}
                                        >
                                            {chat.senderName !==
                                                userData.username && (
                                                <div className='avatar'>
                                                    {chat.senderName}
                                                </div>
                                            )}
                                            <div className='message-data'>
                                                {chat.message}
                                            </div>
                                            {chat.senderName ===
                                                userData.username && (
                                                <div className='avatar self'>
                                                    {chat.senderName}
                                                </div>
                                            )}
                                        </li>
                                    )
                                )}
                            </ul>

                            <div className='send-message'>
                                <input
                                    type='text'
                                    className='input-message'
                                    placeholder='메시지를 입력하세요'
                                    value={userData.message}
                                    onChange={handleMessage}
                                    onKeyDown={handleKeyPressPrivate}
                                />
                                <button
                                    type='button'
                                    className='send-button'
                                    onClick={sendPrivateValue}
                                >
                                    전송
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <div className='register'>
                    {/* <input
                        id='user-name'
                        placeholder='Enter your name'
                        name='userName'
                        value={userData.username}
                        onChange={handleUsername}
                        margin='normal'
                    /> */}
                    <button type='button' onClick={registerUser}>
                        접속
                    </button>
                </div>
            )}
        </div>
    );
};

export default ChatRoom;
