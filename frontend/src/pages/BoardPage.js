import React from 'react';

import Header from '../components/Header';
import BoardUI from '../components/BoardUi';

const BoardPage = () =>
{
    return(
        <div id="dumbBoardContainer">
            <Header />
            <BoardUI />
        </div>
    );
}

export default BoardPage;
