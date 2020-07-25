import React from 'react';

import Header from '../components/Header';
import ListofBoardsUi from '../components/ListofBoardsUi';

const ListOfBoardsPage = () =>
{
    return(
        <div id="boardsPageContainer">
            <Header />
            <ListofBoardsUi />
        </div>
    );
}

export default ListOfBoardsPage;