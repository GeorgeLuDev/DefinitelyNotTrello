import React, { Component } from 'react';

class BoardUi extends Component 
{
    constructor(props)
    {
        super(props)
        this.board = React.createRef();
        this.state = 
        {
            cards: [],
            cardName: '',
            lists: [],
            listName: '',
            newlistindex: -1,
            newcardindex: -1,
            oldlistindex: -1,
            oldcardindex: -1
        }
    }
    
    async componentDidMount()
    {

        var boardId = window.location.pathname.slice(11);

        // console.log(boardId);

        var url = 'http://localhost:5000/api/Board/' + boardId;

        try
        {
            const response = await fetch(url,{method:'GET', headers:{'Content-Type': 'application/json'}});

            // console.log("Getting cards and lists");

            var res = JSON.parse(await response.text());

            // console.log(res);

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
            console.log("there was an error")
        }

    }

    async componentDidUpdate()
    {
        return;
    }

    handleCreateList = async event =>
    {
        event.preventDefault();
        // console.log("calling create list");

        var js = '{"listName":"'+ this.state.listName + '","index":' + this.state.lists.length + ',"parentBoard":"' + window.location.pathname.slice(11) + '"}';

        // console.log(js);

        try
        {
            const response = await fetch('http://localhost:5000/api/CreateList',{method:'POST',body:js,headers:{'Content-Type': 'application/json'}});

            // console.log("calling Create List api");

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
        // console.log("submmiting create card");

        // console.log(event.target.previousSibling.previousSibling.value);
        var js = '{"cardName":"'+ event.target.previousSibling.previousSibling.value + '","index":' + this.state.cards[listIndex].length + ',"parentList":"' + listId + '"}';
        event.target.previousSibling.previousSibling.value = '';
        // console.log(js);

        try
        {
            const response = await fetch('http://localhost:5000/api/CreateCard',{method:'POST',body:js,headers:{'Content-Type': 'application/json'}});

            // console.log("calling Create Card api");

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
        // console.log("submmiting delete list");

        var js = '{"_id":"'+ listId + '"}';

        // console.log(js);

        try
        {
            const response = await fetch('http://localhost:5000/api/DeleteList',{method:'DELETE',body:js,headers:{'Content-Type': 'application/json'}});

            // console.log("calling Delete List api");

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
        // console.log("submmiting delete card");

        var js = '{"_id":"'+ cardId + '"}';

        // console.log(js);

        try
        {
            const response = await fetch('http://localhost:5000/api/DeleteCard',{method:'DELETE',body:js,headers:{'Content-Type': 'application/json'}});

            // console.log("calling Delete Card api");

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
        // console.log("calling update list");

        event.preventDefault();
        // console.log(event);

        var js = '{"_id":"'+ ListId + '","listName":"' + event.target.innerText + '"}';

        // console.log(js);

        try
        {
            const response = await fetch('http://localhost:5000/api/UpdateList',{method:'PUT',body:js,headers:{'Content-Type': 'application/json'}});

            // console.log("calling Update List api");

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
        // console.log("calling update list");

        event.preventDefault();
        // console.log(event);

        var js = '{"_id":"'+ cardId + '","cardName":"' + event.target.innerText + '"}';

        // console.log(js);

        try
        {
            const response = await fetch('http://localhost:5000/api/UpdateCard',{method:'PUT',body:js,headers:{'Content-Type': 'application/json'}});

            // console.log("calling Update Card api");

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
        if (event.target.className === "card")
        {
            event.target.className = "card dragging";
            this.setState
            (
                {
                    newcardindex: (Array.prototype.indexOf.call(event.target.parentNode.children, event.target)-1),
                    newlistindex: (Array.prototype.indexOf.call(event.target.parentNode.parentNode.children, event.target.parentNode)),
                    oldcardindex: (Array.prototype.indexOf.call(event.target.parentNode.children, event.target)-1),
                    oldlistindex: (Array.prototype.indexOf.call(event.target.parentNode.parentNode.children, event.target.parentNode)),
                    oldparentList: event.target.parentNode.getAttribute("data-_id")
                }
            )
        }
        else if (event.target.className === "list")
        {
            event.target.className = "list dragging";

            this.setState
            (
                {
                    newlistindex: (Array.prototype.indexOf.call(event.target.parentNode.children, event.target)),
                    oldlistindex: (Array.prototype.indexOf.call(event.target.parentNode.children, event.target))
                    // (Array.prototype.indexOf.call(event.target.parentNode.children, event.target)-1)
                }
            )
        }
        // console.log(event.target);
    }

    dragOver = event =>
    {
        event.preventDefault();
        var element = document.querySelector('.dragging');

        var afterElement;
       if (event.target.className === "list" && element.className === "card dragging")
       {    
            afterElement = this.getDragAfterElementCard(event.target, event.clientY);


            if (afterElement == null)
            {
                afterElement = event.target.querySelector('.addCard');
                event.target.insertBefore(element, afterElement);
            } 
            else
            {
                event.target.insertBefore(element, afterElement);
            }

       }
       else if (event.target.className === "list" && element.className === "list dragging")
       {
            afterElement = this.getDragAfterElementList(event.target.parentNode, event.clientX);
            if (afterElement == null)
            {
                afterElement = event.target.parentNode.querySelector('.addList');
                event.target.parentNode.insertBefore(element, afterElement);
            } 
            else
            {
                event.target.parentNode.insertBefore(element, afterElement);
            }
       }
    }

    getDragAfterElementCard = (container, y) => {
        const draggableElements = [...container.querySelectorAll('.card:not(.dragging)')]
      
        return draggableElements.reduce((closest, child) => {
          const box = child.getBoundingClientRect();
          const offset = y - box.top - box.height / 2;
          if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child }
          } else {
            return closest
          }
        }, { offset: Number.NEGATIVE_INFINITY }).element
      }

      getDragAfterElementList = (container, x) => {
        const draggableElements = [...container.querySelectorAll('.list:not(.dragging)')]
      
        return draggableElements.reduce((closest, child) => {
          const box = child.getBoundingClientRect();
          const offset = x - box.left - box.width / 2;
          if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child }
          } else {
            return closest
          }
        }, { offset: Number.NEGATIVE_INFINITY }).element
      }

    dragEnd = async event =>
    {
        var js;
        var res;
        if (event.target.className === "card dragging")
        {
            event.target.className = "card";
            // update index of card
            console.log("old index of card");
            console.log([this.state.oldlistindex,this.state.oldcardindex]);
            console.log("new index of card");
            console.log([(Array.prototype.indexOf.call(event.target.parentNode.parentNode.children, event.target.parentNode)),(Array.prototype.indexOf.call(event.target.parentNode.children, event.target)-1)]);
            // call move card api

            js = '{"_id":"'+ event.target.getAttribute("data-_id") + '","oldIndex":"' + this.state.oldcardindex + '","newIndex":"' + (Array.prototype.indexOf.call(event.target.parentNode.children, event.target)-1) + '","oldparentList":"' + this.state.oldparentList + '","newparentList":"' + event.target.parentNode.getAttribute("data-_id") + '"}';
            // var js = '{"_id":"'+ this.state.lists[event.target.getAttribute("data-listindex")-0]._id + '","oldIndex":' + (event.target.getAttribute("data-listindex")-0) + '","newIndex":' + 3 + ',"parentBoard":"' + 4 + '"}';            
            console.log(js);

            try
            {
                const response = await fetch('http://localhost:5000/api/MoveCard',{method:'PUT',body:js,headers:{'Content-Type': 'application/json'}});

                // console.log("calling Move Card api");

                res = JSON.parse(await response.text());

                console.log(res);

            }
            catch(e)
            {
                console.log("there was an error");
                console.log(e.toString());
                return;
            }
        }
        else if (event.target.className === "list dragging")
        {
            event.target.className = "list";
            // update index of list
            console.log("old index of list");
            console.log(this.state.oldlistindex);
            console.log("new index of list");
            // console.log(this.state.newlistindex);
            console.log(Array.prototype.indexOf.call(event.target.parentNode.children, event.target));
            // call move list api

            console.log(event.target.getAttribute("data-_id"));

            js = '{"_id":"'+ event.target.getAttribute("data-_id") + '","oldIndex":"' + this.state.oldlistindex + '","newIndex":"' + Array.prototype.indexOf.call(event.target.parentNode.children, event.target) + '","parentBoard":"' + window.location.pathname.slice(11) + '"}';

            console.log(js);

            try
            {
                const response = await fetch('http://localhost:5000/api/MoveList',{method:'PUT',body:js,headers:{'Content-Type': 'application/json'}});

                // console.log("calling Move List api");

                res = JSON.parse(await response.text());

                console.log(res);

            }
            catch(e)
            {
                console.log("there was an error");
                console.log(e.toString());
                return;
            }
            //-----------
        }
        // console.log(event.target);
        // this.componentDidMount();
    }

    replaceVerticalScrollByHorizontal = event => {
        if (event.target.className === "board")
        {
            console.log("1");
            this.board.current.scrollLeft += event.deltaY;
        }
        else if (event.target.className === "list" && !(event.target.scrollHeight > event.target.clientHeight))
        {
            console.log("2");
            this.board.current.scrollLeft += event.deltaY;
        }
        else if (event.target.className === "card" && !(event.target.parentNode.scrollHeight > event.target.parentNode.clientHeight))
        {
            console.log("3");
            this.board.current.scrollLeft += event.deltaY;
        }
        else
        {
            console.log("4");
            // console.log(event.target.scrollHeight > event.target.clientHeight);
        }
    }


    render()
    {
        return(
            <div className="board" onWheel={(e) => this.replaceVerticalScrollByHorizontal(e)} ref={this.board} >
                {
                    this.state.lists.map(list =>
                        <div className="list" data-_id={list._id} key={list._id} scrollable="true" draggable="true" onDragStart={(e) => this.dragStart(e)} onDragEnd={(e) => this.dragEnd(e)} onDragOver={(e) => this.dragOver(e)} >
                            <div className="listContainer">
                                <div className="listName"  contentEditable="true" spellCheck="false" suppressContentEditableWarning={true} onBlur={(e) => this.handleUpdateList(e,list._id)}>{list.listName}</div>
                                <button className="listButton" data-type={"list"}  onClick={(e) => this.handledeleteList(e,list._id)}>
                                    Delete List
                                </button>
                            </div>
                            {
                                this.state.cards[list.index].map(card =>
                                    <div className="card" data-_id={card._id} key={card._id} draggable="true" onDragStart={(e) => this.dragStart(e)} onDragEnd={(e) => this.dragEnd(e)}>
                                        <div className="cardName" contentEditable="true" spellCheck="false" suppressContentEditableWarning={true} onBlur={(e) => this.handleUpdateCard(e,card._id)}>{card.cardName}</div>
                                        <button className="cardButton" onClick={(e) => this.handledeleteCard(e,card._id)}>
                                            Delete Card
                                        </button>
                                    </div>)
                            }
                            <form className="addCard">
                                <input type="text" placeholder="Name of new Card"/><span></span>
                                <input type="submit" value="Create" onClick={(e) => this.handleCreateCard(e,list._id,list.index)}/><br/>
                            </form>
                        </div>)
                }


                <form className="addList">
                    <input className="cardInput" type="text" placeholder="Name of new List" value={this.state.listName} onChange={this.handleListNameChange}/><span></span>
                    <input className="createcardbutton" type="submit" value="Create" onClick={this.handleCreateList}/><br/>
                </form>
            </div>
        )
    }
};

export default BoardUi;