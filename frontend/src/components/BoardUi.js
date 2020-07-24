import React, { Component } from 'react';

class BoardUi extends Component 
{
    constructor(props)
    {
        super(props)
        this.board = React.createRef();
        this.state = 
        {
            boardName: '',
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
        // var element = document.querySelector('.board');
        // var imgUrl = "https://trello-backgrounds.s3.amazonaws.com/SharedBackground/2366x1600/e3c9ac11f5cd1a47f2eb785d66f64b70/photo-1585245332774-3dd2b177e7fa.jpg"
        // element.style = {backgroundImage: 'url(' + imgUrl + ')'};
        // console.log(element);
        var boardId = window.location.pathname.slice(-24);

        // console.log(boardId);

        var url = process.env.REACT_APP_URL + 'Board/' + boardId;

        try
        {
            const response = await fetch(url,{method:'GET', headers:{'Content-Type': 'application/json'}});

            // console.log("Getting cards and lists");

            var res = JSON.parse(await response.text());

            var windowHeight = window.screen.height;
            var headerNavHeight = document.getElementById("headernavbar").offsetHeight;
            var boardMenuHeight = document.getElementById("boardMenuHeader").offsetHeight;
            var bgHeight = (windowHeight-headerNavHeight- boardMenuHeight).toString();
            // console.log("HEIGHT TEST: " + bgHeight);


            document.body.style.backgroundImage =  "url(\"" + res.boardBackground + "\")";
            

            this.setState
            (
                {
                    boardName : res.boardString,
                    boardBackground : ( "url(" + res.boardBackground + ")"),
                    boardBackgroundHeight: bgHeight,
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

    handleCreateList = async event =>
    {
        event.preventDefault();
        // console.log("calling create list");

        var js = '{"listName":"'+ this.state.listName + '","index":' + this.state.lists.length + ',"parentBoard":"' + window.location.pathname.slice(-24) + '"}';

        // console.log(js);

        try
        {
            const response = await fetch(process.env.REACT_APP_URL + 'CreateList',{method:'POST',body:js,headers:{'Content-Type': 'application/json'}});

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
            const response = await fetch(process.env.REACT_APP_URL + 'CreateCard',{method:'POST',body:js,headers:{'Content-Type': 'application/json'}});

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
            const response = await fetch(process.env.REACT_APP_URL + 'DeleteList',{method:'DELETE',body:js,headers:{'Content-Type': 'application/json'}});

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
        //event.target.remove();
    }

    handledeleteCard = async (event,cardId) =>
    {
        event.preventDefault();
        // console.log("submmiting delete card");

        var js = '{"_id":"'+ cardId + '"}';

        // console.log(js);

        try
        {
            const response = await fetch(process.env.REACT_APP_URL + 'DeleteCard',{method:'DELETE',body:js,headers:{'Content-Type': 'application/json'}});

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
        //event.target.remove();
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
            const response = await fetch(process.env.REACT_APP_URL + 'UpdateList',{method:'PUT',body:js,headers:{'Content-Type': 'application/json'}});

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
            const response = await fetch(process.env.REACT_APP_URL + 'UpdateCard',{method:'PUT',body:js,headers:{'Content-Type': 'application/json'}});

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

    
    handleUpdateBoard = async (event) =>
    {
        console.log("calling update board");

        // event.preventDefault();
        // // console.log(event);

        // var js = '{"_id":"'+ cardId + '","cardName":"' + event.target.innerText + '"}';

        // // console.log(js);

        // try
        // {
        //     const response = await fetch('http://localhost:5000/api/UpdateCard',{method:'PUT',body:js,headers:{'Content-Type': 'application/json'}});

        //     // console.log("calling Update Card api");

        //     var res = JSON.parse(await response.text());

        //     console.log(res);

        // }
        // catch(e)
        // {
        //     console.log("there was an error");
        //     console.log(e.toString());
        //     return;
        // }

        // this.componentDidMount();
    }

    handleListNameChange = event =>
    {
        this.setState({listName: event.target.value});
    }

    dragStart = event =>
    {
        // console.log(event.target);
        if (event.target.className === "card")
        {
            event.target.className = "card dragging";
            // console.log("old index of card is: " + (Array.prototype.indexOf.call(event.target.parentNode.children, event.target)-1) + " | old index of list is: " + Array.prototype.indexOf.call(event.target.parentNode.parentNode.parentNode.children, event.target.parentNode.parentNode) + " | listid: " + event.target.parentNode.parentNode.getAttribute("data-_id"))
            this.setState
            (
                {
                    newcardindex: (Array.prototype.indexOf.call(event.target.parentNode.children, event.target)-1),
                    oldcardindex: (Array.prototype.indexOf.call(event.target.parentNode.children, event.target)-1),
                    newlistindex: (Array.prototype.indexOf.call(event.target.parentNode.parentNode.parentNode.children, event.target.parentNode.parentNode)),
                    oldlistindex: (Array.prototype.indexOf.call(event.target.parentNode.parentNode.parentNode.children, event.target.parentNode.parentNode)),
                    oldparentList: event.target.parentNode.parentNode.getAttribute("data-_id")
                }
            )
        }
        else if (event.target.className === "listHolder")
        {
            event.target.className = "listHolder dragging";
            // console.log("old index of list is: " + Array.prototype.indexOf.call(event.target.parentNode.children, event.target))
            this.setState
            (
                {
                    newlistindex: Array.prototype.indexOf.call(event.target.parentNode.children, event.target),
                    oldlistindex: Array.prototype.indexOf.call(event.target.parentNode.children, event.target)
                }
            )
        }
        return;
    }

    dragOver = (event,listid) =>
    {
        // abc is the current list we are hovering over
        event.preventDefault();
        var element = document.querySelector('.dragging');
        var currentList = document.getElementById(listid);
        var afterElement;
       if (event.target.className === "card" && element.className === "card dragging")
       {    
        //    console.log("card");

            afterElement = this.getDragAfterElementCard(currentList.children[0], event.clientY);


            if (afterElement == null)
            {
                afterElement = currentList.children[0].querySelector('.addCard');
                currentList.children[0].insertBefore(element, afterElement);
            } 
            else
            {
                currentList.children[0].insertBefore(element, afterElement);
            }
       }
       else if (element.className === "listHolder dragging")
       {
          // console.log("list");

          afterElement = this.getDragAfterElementList(currentList.parentNode, event.clientX);

          if (afterElement == null)
          {
              afterElement = currentList.parentNode.querySelector('.addList');
              currentList.parentNode.insertBefore(element, afterElement);
          }
          else
          {
              currentList.parentNode.insertBefore(element, afterElement);
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
        const draggableElements = [...container.querySelectorAll('.listHolder:not(.dragging)')]
      
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
            console.log([Array.prototype.indexOf.call(event.target.parentNode.parentNode.parentNode.children, event.target.parentNode.parentNode),(Array.prototype.indexOf.call(event.target.parentNode.children, event.target)-1)]);
            // call move card api

            js = '{"_id":"'+ event.target.getAttribute("data-_id") + '","oldIndex":"' + this.state.oldcardindex + '","newIndex":"' + (Array.prototype.indexOf.call(event.target.parentNode.children, event.target)-1) + '","oldparentList":"' + this.state.oldparentList + '","newparentList":"' + event.target.parentNode.getAttribute("data-_id") + '"}';
            // var js = '{"_id":"'+ this.state.lists[event.target.getAttribute("data-listindex")-0]._id + '","oldIndex":' + (event.target.getAttribute("data-listindex")-0) + '","newIndex":' + 3 + ',"parentBoard":"' + 4 + '"}';            
            console.log(js);

            try
            {
                const response = await fetch(process.env.REACT_APP_URL + 'MoveCard',{method:'PUT',body:js,headers:{'Content-Type': 'application/json'}});

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

            this.setState(
            {
              lists:[],
              cards:[]
            });
        }
        else if (event.target.className === "listHolder dragging")
        {
            event.target.className = "listHolder";
            // update index of list
            console.log("old index of list");
            console.log(this.state.oldlistindex);
            console.log("new index of list");
            console.log(Array.prototype.indexOf.call(event.target.parentNode.children, event.target));
            // call move list api

            // console.log(event.target.getAttribute("data-_id"));

            js = '{"_id":"'+ event.target.getAttribute("data-_id") + '","oldIndex":"' + this.state.oldlistindex + '","newIndex":"' + Array.prototype.indexOf.call(event.target.parentNode.children, event.target) + '","parentBoard":"' + window.location.pathname.slice(-24) + '"}';

            // console.log(js);

            try
            {
                const response = await fetch(process.env.REACT_APP_URL + 'MoveList',{method:'PUT',body:js,headers:{'Content-Type': 'application/json'}});

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
        this.componentDidMount();
    }

    replaceVerticalScrollByHorizontal = event => 
    {
        // if (event.target.className === "board" && !(event.target.scrollHeight > event.target.clientHeight))
        // {
        //     console.log(event.target.scrollHeight > event.target.clientHeight);
        // }
        if (event.target.className === "listHolder" && !(event.target.scrollHeight > event.target.clientHeight))
        {
            this.board.current.scrollLeft += event.deltaY;
            // console.log("1.scrolling left or right");
        }
        else if (event.target.className === "addList" | event.target.className === "ListInput" | event.target.className === "createlistbutton")
        {
            this.board.current.scrollLeft += event.deltaY;
            // console.log("9.scrolling left or right");
        }
        else if (event.target.className === "list" && !(event.target.parentNode.scrollHeight > event.target.parentNode.clientHeight))
        {
            this.board.current.scrollLeft += event.deltaY;
            // console.log("2.scrolling left or right");
        }
        else if ((event.target.className === "listContainer" || event.target.className === "card" || event.target.className === "addCard") && !(event.target.parentNode.parentNode.scrollHeight > event.target.parentNode.parentNode.clientHeight))
        {
            this.board.current.scrollLeft += event.deltaY;
            // console.log("3.scrolling left or right");
        }
        else if ( (event.target.className === "listName" || event.target.className === "listButton" || event.target.className === "cardName" || event.target.className === "deleteCard" || event.target.className === "cardInput" || event.target.className === "createcardbutton") && !(event.target.parentNode.parentNode.parentNode.scrollHeight > event.target.parentNode.parentNode.parentNode.clientHeight))
        {
            this.board.current.scrollLeft += event.deltaY;
            // console.log("4.scrolling left or right");
        }
        else 
        {
            // console.log("5.scrolling up or down");
        }
        // if (event.target.className === "board")
        // {
        //     console.log(1);
        //     this.board.current.scrollLeft += event.deltaY;
        // }
        // else if ( (event.target.className === "list" || event.target.className === "listContainer" || event.target.className === "listName" || event.target.className === "listButton") && (event.target.scrollHeight > event.target.clientHeight))
        // {
        //     console.log(2);
        //     this.board.current.scrollLeft += event.deltaY;
        // }
        // else if ( (event.target.className === "card" || event.target.className === "cardName" || event.target.className === "deleteCard")&& (event.target.parentNode.scrollHeight > event.target.parentNode.clientHeight))
        // {
        //     console.log(3);
        //     this.board.current.scrollLeft += event.deltaY;
        // }
        // else
        // {

        //     console.log(4);
        //     // console.log(event.target.scrollHeight > event.target.clientHeight);
        // }
    }

    searchList = event => 
    {
        // console.log("searching list");
        // console.log(event.target.value);
        var i,j;
        document.getElementById("searchcard").value = "";
        for (i=0;i<this.state.lists.length;i++)
        {
            for (j=0;j<this.state.cards[i].length;j++)
            {
                document.getElementById(this.state.cards[i][j]._id).style.opacity = 1;
            }
        }
        var query = new RegExp(event.target.value, 'g');
        for (i=0;i<this.state.lists.length;i++)
        {
            if (event.target.value === "")
            {
                document.getElementById(this.state.lists[i]._id).style.opacity = 1;
                continue;
            }
            // console.log(this.state.lists[i]);
            document.getElementById(this.state.lists[i]._id).style.opacity = 0.5;
            if (this.state.lists[i].listName.match(query) !== null)
            {
                // console.log("got into for loop");
                // console.log(this.state.lists[i]._id);
                document.getElementById(this.state.lists[i]._id).style.opacity = 1;
            }
        }
    }

    searchCard = event => 
    {
        // console.log("searching list");
        // console.log(event.target.value);
        var i,j;
        document.getElementById("searchlist").value = "";
        for (i=0;i<this.state.lists.length;i++)
        {
            document.getElementById(this.state.lists[i]._id).style.opacity = 1;
        }
        var query = new RegExp(event.target.value, 'g');
        // console.log(this.state.lists.length);
        // console.log(this.state.cards.length);
        for (i=0;i<this.state.lists.length;i++)
        {
            for (j=0;j<this.state.cards[i].length;j++)
            {
                // console.log([i,j]);
                console.log(this.state.cards[i][j].cardName);
                if (event.target.value === "")
                {
                    document.getElementById(this.state.cards[i][j]._id).style.opacity = 1;
                    continue;
                }
                // console.log(this.state.lists[i]);
                document.getElementById(this.state.cards[i][j]._id).style.opacity = 0.5;
                if (this.state.cards[i][j].cardName.match(query) !== null)
                {
                    console.log("got into for loop");
                    // console.log(this.state.lists[i]._id);
                    document.getElementById(this.state.cards[i][j]._id).style.opacity = 1;
                }
            }
        }

    }

    render()
    {
      return(
        <div id="boardGridContainer" /*style={{backgroundImage : this.state.boardBackground}} */ >
          <div id="boardMenuHeader">
            <span id="boardNameSpan" contentEditable="true" spellCheck="false" suppressContentEditableWarning={true} onBlur={(e) => this.handleUpdateBoard(e)}>{this.state.boardName}</span>
            <span className="boardMenuDivider"></span>
            <span id="addUserButton">
              <form>
                <label>Share</label>
                <input name="shareEmail"placeholder="User's email"></input>
              </form>
            </span>
            <div id="boardMenuRightside">
              <div id="editBGButton">
                <p>Edit Image</p>
              </div>
              <form>
                <input id="searchlist" name="searchList" placeholder="Highlight Lists" onChange={(e) => this.searchList(e)}></input>
                <input id="searchcard" name="searchCard" placeholder="Highlight Cards" onChange={(e) => this.searchCard(e)}></input>
              </form>
            </div>
          </div>
          <div className="board"  onWheel={(e) => this.replaceVerticalScrollByHorizontal(e)} ref={this.board} style={{height : this.state.boardBackgroundHeight} } >
              {
                  this.state.lists.map(list =>
                      <div className="listHolder" id={list._id} data-_id={list._id} key={list._id} draggable="true" onDragStart={(e) => this.dragStart(e)} onDragEnd={(e) => this.dragEnd(e)} onDragOver={(e) => this.dragOver(e,list._id)}>
                        <div className="list" data-_id={list._id} key={list._id} scrollable="true">
                          <div className="listContainer">
                              <div className="listName"  contentEditable="true" spellCheck="false" suppressContentEditableWarning={true} onBlur={(e) => this.handleUpdateList(e,list._id)}>{list.listName}</div>
                              
                              <input className="completeList" type="checkbox"></input>
                              <button className="listButton" data-type={"list"}  onClick={(e) => this.handledeleteList(e,list._id)}>
                                  &times;
                              </button>
                              
                          </div>
                          {
                              this.state.cards[list.index].map(card =>
                                  <div className="card" id={card._id} data-_id={card._id} key={card._id} draggable="true" onDragStart={(e) => this.dragStart(e)} onDragEnd={(e) => this.dragEnd(e)}>
                                      <div className="cardName" contentEditable="true" spellCheck="false" suppressContentEditableWarning={true} onBlur={(e) => this.handleUpdateCard(e,card._id)}>
                                        
                                          {card.cardName}
                                        
                                      </div>
                                      <input className="completeCard" type="checkbox"></input>
                                      <button className="deleteCard" onClick={(e) => this.handledeleteCard(e,card._id)}>
                                          &times;
                                      </button>
                                  </div>)
                          }
                          <form className="addCard">
                              <input className="cardInput" type="text" placeholder="Add a Card..."/><br />
                              <input className="createcardbutton" type="submit" value="Create" onClick={(e) => this.handleCreateCard(e,list._id,list.index)}/><br/>
                          </form>
                        </div>
                      </div>)
              }


              <form className="addList">
                  <input className="ListInput" type="text" placeholder="Add a List..." value={this.state.listName} onChange={this.handleListNameChange}/><span></span>
                  <input className="createlistbutton" type="submit" value="Create" onClick={this.handleCreateList}/><br/>
              </form>
          </div>

          <div id="editBgModal" className="modalbg modalHider">
            <div id="editBgModalContent">
              <h3>Select a new background image</h3>
              <span id="closeBgModal">&times;</span>
              <span id="closeBgModal">&times;</span>
              <p>Check out these sweet backgrounds</p>
              <div id="bgpreviewcontainer">
                <div className="bgoption"></div>
                <div className="bgoption"></div>
                <div className="bgoption"></div>
                <div className="bgoption"></div>
                <div className="bgoption"></div>
                <div className="bgoption"></div>
                <div className="bgoption"></div>
                <div className="bgoption"></div>
                <div className="bgoption"></div>
                <div className="bgoption"></div>
                <div className="bgoption"></div>
                <div className="bgoption"></div>
                <div className="bgoption"></div>
                <div className="bgoption"></div>
                <div className="bgoption"></div>
                <div className="bgoption"></div>
                <div className="bgoption"></div>
                <div className="bgoption"></div>
                <div className="bgoption"></div>
                <div className="bgoption"></div>
              </div>
            </div>
          </div>
      </div>
      )
    }
};

export default BoardUi;
