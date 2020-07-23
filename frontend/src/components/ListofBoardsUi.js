import React, { Component } from 'react';

class ListofBoardsUi extends Component
{
    constructor(props)
    {
        super(props)

        this.state = 
        {
            boards: [],
            boardName: '',
            newboardindex: '',
            oldboardindex: ''
        }
    }

    async componentDidMount()
    {
        var user = JSON.parse(localStorage.getItem('user_data'));
        // var js = '{"email":"'+ user.id + '"}';
        // console.log(js);
        var url = 'http://localhost:5000/api/User/' + user.id;

        try
        {
            const response = await fetch(url,{method:'GET',headers:{'Content-Type': 'application/json'}});

            // console.log("calling get boards api");

            var res = JSON.parse(await response.text());

            console.log(res);

            this.setState
            (
                {
                    boards: res.result
                }
            )
            
            this.handleUpdate = this.handleUpdate.bind(this);

            // console.log(this.state.boards);
        }
        catch(e)
        {
            console.log("there was an error");
            console.log(e.toString());
            return;
        }
    }

    handleCreate = async event =>
    {
        event.preventDefault();
        console.log("submmiting create board");

        var user = JSON.parse(localStorage.getItem('user_data'));
        var js = '{"boardName":"'+ this.state.boardName + '","index":' + this.state.boards.length + ',"parentUsers":["' + user.id + '"]}';

        console.log(js);

        try
        {
            const response = await fetch('http://localhost:5000/api/CreateBoard',{method:'POST',body:js,headers:{'Content-Type': 'application/json'}});

            console.log("calling Create Board api");

            var res = JSON.parse(await response.text());

            console.log(res);

        }
        catch(e)
        {
            console.log("there was an error");
            console.log(e.toString());
            return;
        }

        this.setState({boardName: ''});

        this.componentDidMount();
    }

    handleUpdateBoard = async (event,boardId) =>
    {
        // console.log("calling update list");

        event.preventDefault();
        // console.log(event);

        var js = '{"_id":"'+ boardId + '","boardName":"' + event.target.innerText + '"}';

        // console.log(js);

        try
        {
            const response = await fetch('http://localhost:5000/api/UpdateBoard',{method:'PUT',body:js,headers:{'Content-Type': 'application/json'}});

            // console.log("calling Update Board api");

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

    handleDelete = async (event, id) =>
    {
        console.log(id);
        event.preventDefault();
        console.log("submmiting delete board");

        var js = '{"_id":"'+ id + '"}';

        console.log(js);

        try
        {
            const response = await fetch('http://localhost:5000/api/DeleteBoard',{method:'DELETE',body:js,headers:{'Content-Type': 'application/json'}});

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

    handleGotoPage = (event, boardId) =>
    {
        if (event.target.className === "boards")
            window.location.href = '/BoardPage/' + boardId;
    }

    handleBoardNameChange = event =>
    {
        this.setState({boardName: event.target.value});
    }

    dragStart = event =>
    {
        if (event.target.className === "boards")
        {
            event.target.className = "boards dragging";
            this.setState
            (
                {
                    newboardindex: (Array.prototype.indexOf.call(event.target.parentNode.children, event.target)),
                    oldboardindex: (Array.prototype.indexOf.call(event.target.parentNode.children, event.target))
                }
            )
        }
    }

    dragOver = event =>
    {
        event.preventDefault();
        var element = document.querySelector('.dragging');
        var afterElement;
       if (event.target.className === "boards" && element.className === "boards dragging")
       {    
            // console.log(event.target);
            // console.log(event.clientY);
            afterElement = this.getDragAfterElementBoard(event.target.parentNode, event.clientX);
            if (afterElement == null)
            {
                // console.log("1");
                afterElement = event.target.parentNode.querySelector('.addBoard');
                event.target.parentNode.insertBefore(element, afterElement);
            } 
            else
            {
                event.target.parentNode.insertBefore(element, afterElement);
            }

       }
    }

    getDragAfterElementBoard = (container, x) => {
        const draggableElements = [...container.querySelectorAll('.boards:not(.dragging)')]
      
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
        if (event.target.className === "boards dragging")
        {
            event.target.className = "boards";
            // update index of card
            console.log("old index of board");
            console.log(this.state.oldboardindex);
            console.log("new index of board");
            console.log((Array.prototype.indexOf.call(event.target.parentNode.children, event.target)));
            // call move boards api

            var user = JSON.parse(localStorage.getItem('user_data'));

            var js = '{"_id":"'+ event.target.getAttribute("data-_id") + '","oldIndex":"' + this.state.oldboardindex + '","newIndex":"' + (Array.prototype.indexOf.call(event.target.parentNode.children, event.target)) + '","parentUsers":"' + user.id + '"}';

            console.log(js);
            try
            {
                const response = await fetch('http://localhost:5000/api/MoveBoard',{method:'PUT',body:js,headers:{'Content-Type': 'application/json'}});

                // console.log("calling Move Card api");

                var res = JSON.parse(await response.text());

                console.log(res);

            }
            catch(e)
            {
                console.log("there was an error");
                console.log(e.toString());
                return;
            }
        }
    }

    render()
    {
        return(
          <div id="boardsContainer">
            <h2 id="boardsTitle">My Boards</h2>
            <div onDragOver={(e) => this.dragOver(e)}>  
                {/* <h1>WELCOME This is the list of boards page</h1> */}
                {
                    this.state.boards.map(board =>
                        <div className="boards" style={{backgroundImage: "url(\"" + board.boardBackground + "\")"}}  onClick={(e) => this.handleGotoPage(e, board._id)} data-_id={board._id} key={board._id} draggable="true" onDragStart={(e) => this.dragStart(e)} onDragEnd={(e) => this.dragEnd(e)}>
                            <div className="boardsname" contentEditable="true" spellCheck="false" suppressContentEditableWarning={true} onBlur={(e) => this.handleUpdateBoard(e,board._id)}>{board.boardName}</div>
                            <button className="boardDelete" onClick = {(e) => this.handleDelete(e,board._id)}>X</button>
                        </div>)
                }
                <form className="addBoard">
                    {/* <label>Create Board</label> */}
                    <input type="text" id="boardName" placeholder="Name of new Board" value={this.state.boardName} onChange={this.handleBoardNameChange}/><br/>
                    <input type="submit" value="Create" onClick={this.handleCreate}/><br/>
                </form>
            </div>
          </div>
        );
    }
};

export default ListofBoardsUi;
