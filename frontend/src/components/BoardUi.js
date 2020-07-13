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
            listName: '',
            listindex: -1,
            cardindex: -1
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

    dragStart = event =>
    {
        event.target.className = "card dragging";
    }

    dragOver = event =>
    {
        event.preventDefault();
        var card = document.querySelector('.dragging');
       if (event.target.className === "list")
       {
            //    event.target.getAttribute("data-listindex")
            //    event.target.parentNode.childNodes[event.target.getAttribute("data-listindex")].appendChild(card);   
            //      console.log(event.target.childNodes);
            var afterElement = this.getDragAfterElement(event.target, event.clientY);

            if (afterElement == null)
            {
                afterElement = event.target.querySelector('.addCard');
                event.target.insertBefore(card, afterElement);
            } 
            else
            {
                event.target.insertBefore(card, afterElement);
            }
       }
    }

    getDragAfterElement = (container, y) => {
        const draggableElements = [...container.querySelectorAll('.card:not(.dragging)')]
      
        return draggableElements.reduce((closest, child) => {
          const box = child.getBoundingClientRect()
          const offset = y - box.top - box.height / 2
          if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child }
          } else {
            return closest
          }
        }, { offset: Number.NEGATIVE_INFINITY }).element
      }

    dragEnd = event =>
    {
        event.target.className = "card";
    }

    render()
    {
        return(
            <div className="board">
                {
                    this.state.lists.map(list =>
                        <div className="list" data-type={"list"} data-listindex={list.index} key={list._id} onDragOver={(e) => this.dragOver(e)}>
                            <div className="listContainer" data-type={"list"} data-listindex={list.index}>
                                <div className="listName" data-type={"list"} data-listindex={list.index} contentEditable="true" spellCheck="false" suppressContentEditableWarning={true} onBlur={(e) => this.handleUpdateList(e,list._id)}>{list.listName}</div>
                                <button data-type={"list"} data-listindex={list.index} onClick={(e) => this.handledeleteList(e,list._id)}>
                                    Delete List
                                </button>
                            </div>
                            {
                                this.state.cards[list.index].map(card =>
                                    <div className="card" data-listindex={list.index} data-type={"card"} data-cardindex={card.index} data-index={[list.index,card.index]} key={card._id} draggable="true" onDragStart={(e) => this.dragStart(e)} onDragEnd={(e) => this.dragEnd(e)}>
                                        <div className="cardName" data-type={"card"} data-listindex={list.index} data-cardindex={card.index} contentEditable="true" spellCheck="false" suppressContentEditableWarning={true} onBlur={(e) => this.handleUpdateCard(e,card._id)}>{card.cardName}</div>
                                        <button data-type={"card"} data-listindex={list.index} data-cardindex={card.index} onClick={(e) => this.handledeleteCard(e,card._id)}>
                                            Delete Card
                                        </button>
                                    </div>)
                            }
                            <form className="addCard">
                                <label>Create Card</label>
                                <input type="text" id="listName" placeholder="Name of new Card"/><br/>
                                <input type="submit" value="Create" onClick={(e) => this.handleCreateCard(e,list._id,list.index)}/><br/>
                            </form>
                        </div>)
                }


                <form className="addList">
                    <label>Create List</label>
                    <input type="text" id="listName" placeholder="Name of new List" value={this.state.listName} onChange={this.handleListNameChange}/><br/>
                    <input type="submit" value="Create" onClick={this.handleCreateList}/><br/>
                </form>
            </div>
        )
    }
};

export default BoardUi;