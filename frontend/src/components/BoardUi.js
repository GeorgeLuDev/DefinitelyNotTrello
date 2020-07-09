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

    handleCreateList = async event =>
    {
        event.preventDefault();
        console.log("submmiting create list");

        var js = '{"listName":"'+ this.state.listName + '","index":' + this.state.lists.length + ',"parentBoard":"' + window.location.pathname.slice(11) + '"}';

        console.log(js);

        try
        {
            const response = await fetch('http://localhost:5000/api/CreateList',{method:'POST',body:js,headers:{'Content-Type': 'application/json'}});

            console.log("calling Create List api");

            var res = JSON.parse(await response.text());

            console.log(res);

        }
        catch(e)
        {
            console.log("there was an error");
            console.log(e.toString());
            return;
        }

        this.setState({listName: ''});

        this.componentDidMount();
    }

    handleCreateCard = async (event,listId,listIndex) =>
    {
        event.preventDefault();
        console.log("submmiting create card");

        console.log(event.target.previousSibling.previousSibling.value);
        var js = '{"cardName":"'+ event.target.previousSibling.previousSibling.value + '","index":' + this.state.cards[listIndex].length + ',"parentList":"' + listId + '"}';
        event.target.previousSibling.previousSibling.value = '';
        console.log(js);

        try
        {
            const response = await fetch('http://localhost:5000/api/CreateCard',{method:'POST',body:js,headers:{'Content-Type': 'application/json'}});

            console.log("calling Create Card api");

            var res = JSON.parse(await response.text());

            console.log(res);

        }
        catch(e)
        {
            console.log("there was an error");
            console.log(e.toString());
            return;
        }
        this.componentDidMount();
    }

    handledeleteList = async (event,listId) =>
    {
        event.preventDefault();
        console.log("submmiting delete list");

        var js = '{"_id":"'+ listId + '"}';

        console.log(js);

        try
        {
            const response = await fetch('http://localhost:5000/api/DeleteList',{method:'DELETE',body:js,headers:{'Content-Type': 'application/json'}});

            console.log("calling Delete List api");

            var res = JSON.parse(await response.text());

            console.log(res);

        }
        catch(e)
        {
            console.log("there was an error");
            console.log(e.toString());
            return;
        }

        this.componentDidMount();
    }

    handledeleteCard = async (event,cardId) =>
    {
        event.preventDefault();
        console.log("submmiting delete card");

        var js = '{"_id":"'+ cardId + '"}';

        console.log(js);

        try
        {
            const response = await fetch('http://localhost:5000/api/DeleteCard',{method:'DELETE',body:js,headers:{'Content-Type': 'application/json'}});

            console.log("calling Delete Card api");

            var res = JSON.parse(await response.text());

            console.log(res);

        }
        catch(e)
        {
            console.log("there was an error");
            console.log(e.toString());
            return;
        }

        this.componentDidMount();
    }

    handleUpdateList = async (event,ListId) =>
    {
        console.log("submmiting update list");

        event.preventDefault();
        console.log(event);

        var js = '{"_id":"'+ ListId + '","listName":"' + event.target.innerText + '"}';

        console.log(js);

        try
        {
            const response = await fetch('http://localhost:5000/api/UpdateList',{method:'PUT',body:js,headers:{'Content-Type': 'application/json'}});

            console.log("calling Update List api");

            var res = JSON.parse(await response.text());

            console.log(res);

        }
        catch(e)
        {
            console.log("there was an error");
            console.log(e.toString());
            return;
        }

        this.componentDidMount();
    }

    handleUpdateCard = async (event,cardId) =>
    {
        console.log("submmiting update list");

        event.preventDefault();
        console.log(event);

        var js = '{"_id":"'+ cardId + '","cardName":"' + event.target.innerText + '"}';

        console.log(js);

        try
        {
            const response = await fetch('http://localhost:5000/api/UpdateCard',{method:'PUT',body:js,headers:{'Content-Type': 'application/json'}});

            console.log("calling Update Card api");

            var res = JSON.parse(await response.text());

            console.log(res);

        }
        catch(e)
        {
            console.log("there was an error");
            console.log(e.toString());
            return;
        }

        this.componentDidMount();
    }

    handleListNameChange = event =>
    {
        this.setState({listName: event.target.value});
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
                            <p contentEditable="true" spellCheck="false" suppressContentEditableWarning={true} onBlur={(e) => this.handleUpdateList(e,list._id)}>{list.listName}</p>
                            <button onClick={(e) => this.handledeleteList(e,list._id)}>
                                Delete List
                            </button>
                            <ol>
                            {
                                this.state.cards[list.index].map(card =>
                                    <li key={card._id}>
                                        <p contentEditable="true" spellCheck="false" suppressContentEditableWarning={true} onBlur={(e) => this.handleUpdateCard(e,card._id)}>{card.cardName}</p>
                                        <button onClick={(e) => this.handledeleteCard(e,card._id)}>
                                            Delete Card
                                        </button>
                                    </li>
                                    )
                            }
                            </ol>
                            <form>
                                <label>Create Card</label>
                                <input type="text" id="listName" placeholder="Name of new Card"/><br/>
                                <input type="submit" value="Create" onClick={(e) => this.handleCreateCard(e,list._id,list.index)}/><br/>
                            </form>
                        </li>)
                }
                </ol>

                <form>
                    <label>Create List</label>
                    <input type="text" id="listName" placeholder="Name of new List" value={this.state.listName} onChange={this.handleListNameChange}/><br/>
                    <input type="submit" value="Create" onClick={this.handleCreateList}/><br/>
                </form>
            </div>
        )
    }
};

export default BoardUi;