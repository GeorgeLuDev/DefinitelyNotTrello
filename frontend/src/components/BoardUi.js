import React, { Component } from 'react';

class BoardUi extends Component 
{
    constructor(props)
    {
        super(props)

        this.state = 
        {
            cards: [],
            cardName: '',
            lists: [],
            listName: ''
        }
    }
    
    async componentDidMount()
    {

        var boardId = window.location.pathname.slice(11);

        console.log(boardId);

        var user = JSON.parse(localStorage.getItem('user_data'));
        var url = 'http://localhost:5000/api/Board/' + boardId;

        try
        {
            const response = await fetch(url,{method:'GET', headers:{'Content-Type': 'application/json'}});

            console.log("Getting cards and lists");

            var res = JSON.parse(await response.text());

            console.log(res);

            this.setState
            (
                {
                    lists: res.listString,
                    cards: res.cardString,
                }
            )

        }
        catch
        {

        }

    }
    render()
    {
        return(
            <div>
                <h1>Welcome to your board. These are your lists:</h1>
                <ol>
                {
                    this.state.lists.map(list =>
                        <li key={list._id}>
                            <p>{list.listName}</p>
                            <ol>
                            {
                                this.state.cards[list.index].map(card =>
                                    <li key={card._id}>
                                        <p>{card.cardName}</p>
                                    
                                    </li>)
                            }
                            </ol>
                            <form>
                                <label>Create Card</label>
                                <input type="text" id="listName" placeholder="Name of new Board" value={this.state.boardName} onChange={this.handleBoardNameChange}/><br/>
                                <input type="submit" value="Create" onClick={this.handleCreate}/><br/>
                            </form>
                        </li>)
                }
                </ol>

                <form>
                    <label>Create List</label>
                    <input type="text" id="listName" placeholder="Name of new Board" value={this.state.boardName} onChange={this.handleBoardNameChange}/><br/>
                    <input type="submit" value="Create" onClick={this.handleCreate}/><br/>
                </form>
            </div>
        )
    }
};

export default BoardUi;