import React, { useState } from 'react'
import styled from 'styled-components';

const FestBlock = styled.div`
      h1 {
    font-size: 12pt;
    }

  article {
    align-content:center;
  }
`

function fest({article}) {
    const API_KEU = "";
    const[location, setLocation] = useState('');
    
    // name : 축제이름, date : 날짜, location : 장소 
    const { name, date, location } = article;
    return (
    
      <FestBlock>
       
          <div className='article'>
          <h1>{ name && name.slice(0,10)+'...'}</h1>
          <p>{ location && location.slice(0,10)+'...'}</p>
          </div>
      </FestBlock>
      
      )
    };

export default fest;