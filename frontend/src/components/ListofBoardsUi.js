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
            oldboardindex: '',
            x : 0,
            y : 0
        }
    }

    async componentDidMount()
    {
        var user = JSON.parse(localStorage.getItem('user_data'));
        if (user === null)
        {
            window.location.href = '/';
            return;
        }
        // var js = '{"email":"'+ user.id + '"}';
        // console.log(js);
        var url = process.env.REACT_APP_URL  + 'User/' + user.id;
	// console.log(url);

        try
        {
            const response = await fetch(url,{method:'GET',headers:{'Content-Type': 'application/json'}});

            // console.log("calling get boards api");

            var res = JSON.parse(await response.text());

            // console.log(res);

            this.setState
            (
                {
                    boards: res.result
                }
            )

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
        if (this.state.boardName === "")
        {
            return;
        }
        // console.log("submmiting create board");

        var query = "nature";

        var imageURL = "";
        var res;
        try
        {
            const response = await fetch("https://api.unsplash.com/photos/random?query="+
              query +"&client_id=q4WYOaQmdzhlMD70q376IHwswPNmqQePfyeiRw_XGGg&count=1",{method:'GET',headers:{'Content-Type': 'application/json'}});

            res = JSON.parse(await response.text());

            res.map(res => console.log(res.urls.thumb));

            this.setState({
                thumbnails : res
            });
        }
        catch(e)
        {
            console.log("there was an error");
            console.log(e.toString());
            return;
        }
        
        imageURL = res[0].urls.regular;
        var user = JSON.parse(localStorage.getItem('user_data'));
        var js = '{"boardName":"'+ this.state.boardName + '","index":' + this.state.boards.length + ',"parentUsers":["' + user.id + '"],"background":"' + imageURL + '"}';

        // console.log(js);

        try
        {
            const response = await fetch(process.env.REACT_APP_URL + 'CreateBoard',{method:'POST',body:js,headers:{'Content-Type': 'application/json'}});

            // console.log("calling Create Board api");

            res = JSON.parse(await response.text());

            // console.log(res);

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
        if (event.target.innerText === "")
        {
            event.target.innerText = "Board";
        }

        var js = '{"_id":"'+ boardId + '","boardName":"' + event.target.innerText + '"}';

        // console.log(js);

        try
        {
            // eslint-disable-next-line no-unused-vars
            const response = await fetch(process.env.REACT_APP_URL  + 'UpdateBoard',{method:'PUT',body:js,headers:{'Content-Type': 'application/json'}});

            // console.log("calling Update Board api");

            // var res = JSON.parse(await response.text());

            // console.log(res);

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
        // console.log(id);
        event.preventDefault();
        // console.log("submmiting delete board");

        var js = '{"_id":"'+ id + '"}';

        console.log(js);

        try
        {
            // eslint-disable-next-line no-unused-vars
            const response = await fetch(process.env.REACT_APP_URL + 'DeleteBoard',{method:'DELETE',body:js,headers:{'Content-Type': 'application/json'}});

            // var res = JSON.parse(await response.text());

            // console.log(res);

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
        this.setState({x: event.pageX, y:event.pageY});
    }

    dragOver = event =>
    {
        event.preventDefault();
        var element = document.querySelector('.dragging');
        var parent = document.getElementById("boardsList");
        var afterElement;

        // console.log(event.target);
       if (event.target.className === "boards")
       {    
            // console.log(event.target);
            // console.log(event.clientY);
            // afterElement = this.getDragAfterElementBoard(parent, event.clientX, event.clientY);
            afterElement = event.target;
            
            var box = event.target.getBoundingClientRect();
            // console.log(box);
            // console.log(event.pageX);
            if (box.x > event.pageX)
            {
                // coming from left
                afterElement = event.target;
            }
            else
            {
                // coming from right
                afterElement = event.target.nextSibling;
            }
            // console.log(afterElement);
            if (afterElement == null)
            {
                // console.log("1");
                afterElement = parent.querySelector('.addBoard');
                parent.insertBefore(element, afterElement);
            } 
            else
            {
                parent.insertBefore(element, afterElement);
            }

       }
       this.setState({x: event.pageX, y:event.pageY});
    }

    getDragAfterElementBoard = (container, x, y) => {
        const draggableElements = [...container.querySelectorAll('.boards:not(.dragging)')]
        return draggableElements.reduce((closest, child) => {
          const box = child.getBoundingClientRect();
          const offset1 = x - box.left - box.width / 2;
          const offset2 = y - box.top - box.height / 2;
          if (offset1 < 0 && offset1 > closest.offset1 && offset2 < 0 && offset2 > closest.offset1 ) 
          {
            // console.log(closest);
            return { offset1: offset1,offset2: offset2 ,element: child }
          }
           else 
            {
                // console.log(closest);
            return closest
          }
        }, { offset1: Number.NEGATIVE_INFINITY, offset2: Number.NEGATIVE_INFINITY }).element
      }

    dragEnd = async event =>
    {
        if (event.target.className === "boards dragging")
        {
            event.target.className = "boards";
            // update index of card
            // console.log("old index of board");
            // console.log(this.state.oldboardindex);
            // console.log("new index of board");
            // console.log((Array.prototype.indexOf.call(event.target.parentNode.children, event.target)));
            // call move boards api

            var user = JSON.parse(localStorage.getItem('user_data'));

            var js = '{"_id":"'+ event.target.getAttribute("data-_id") + '","oldIndex":"' + this.state.oldboardindex + '","newIndex":"' + (Array.prototype.indexOf.call(event.target.parentNode.children, event.target)) + '","parentUsers":"' + user.id + '"}';

            // console.log(js);
            try
            {
                // eslint-disable-next-line no-unused-vars
                const response = await fetch(process.env.REACT_APP_URL + 'MoveBoard',{method:'PUT',body:js,headers:{'Content-Type': 'application/json'}});

                // console.log("calling Move Card api");

                // var res = JSON.parse(await response.text());

                // console.log(res);

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
          <div id="boardsContainer" >
            <h2 id="boardsTitle">My Boards</h2>
            <div id="boardsList">  
                {/* <h1>WELCOME This is the list of boards page</h1> */}
                {
                    this.state.boards.map(board =>
                        <div className="boards" onDragLeave={(e) => this.dragOver(e)}  onDragEnter={(e) => this.dragOver(e)} style={{backgroundImage: "url(\"" + board.boardBackground + "\")"}} onClick={(e) => this.handleGotoPage(e, board._id)} data-_id={board._id} key={board._id} draggable="true" onDragStart={(e) => this.dragStart(e)} onDragEnd={(e) => this.dragEnd(e)}>
                            <div className="boardsname" contentEditable="true" spellCheck="false" suppressContentEditableWarning={true} onBlur={(e) => this.handleUpdateBoard(e,board._id)}>{board.boardName}</div>
                            <button className="boardDelete" onClick = {(e) => this.handleDelete(e,board._id)}>&times;</button>
                        </div>)
                }
                <form className="addBoard boards">
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
