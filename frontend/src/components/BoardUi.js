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

    dragStartList = event =>
    {
        console.log("start drag on List");
    }

    dragOverList = event =>
    {
        event.preventDefault();
        console.log(Math.floor(event.clientX / 313));
    }

    dragEndList = event =>
    {
        console.log("drag end on List");
    }

    dragStartCard = event =>
    {
        console.log("start drag on Card");
    }

    dragOverCard = event =>
    {
        event.preventDefault();
        console.log(event.target.innerHTML);
        // console.log([Math.floor(event.clientX / 313), Math.floor((event.clientY - 115) / 75)]);
    }

    dragEndCard = event =>
    {
        console.log("drag end on Card");
    }

    render()
    {
        return(
            <div className="board">
                {
                    this.state.lists.map(list =>
                        <div className="list" key={list._id} draggable="true" onDragStart={(e) => this.dragStartList(e)} onDragOver={(e) => this.dragOverList(e)} onDragEnd={(e) => this.dragEndList(e)}>
                            <div className="listContainer">
                                <div className="listName" contentEditable="true" spellCheck="false" suppressContentEditableWarning={true} onBlur={(e) => this.handleUpdateList(e,list._id)}>{list.listName}</div>
                                <button onClick={(e) => this.handledeleteList(e,list._id)}>
                                    Delete List
                                </button>
                            </div>
                            {
                                this.state.cards[list.index].map(card =>
                                    <div className="card" key={card._id} draggable="true" onDragStart={(e) => this.dragStartCard(e)} onDragOver={(e) => this.dragOverCard(e)} onDragEnd={(e) => this.dragEndCard(e)}>
                                        <div className="cardName" contentEditable="true" spellCheck="false" suppressContentEditableWarning={true} onBlur={(e) => this.handleUpdateCard(e,card._id)}>{card.cardName}</div>
                                        <button onClick={(e) => this.handledeleteCard(e,card._id)}>
                                            Delete Card
                                        </button>
                                    </div>)
                            }
                            <form>
                                <label>Create Card</label>
                                <input type="text" id="listName" placeholder="Name of new Card"/><br/>
                                <input type="submit" value="Create" onClick={(e) => this.handleCreateCard(e,list._id,list.index)}/><br/>
                            </form>
                        </div>)
                }


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