import logo from './logo.svg';
import './App.css';
import { useLayoutEffect, useRef, useState } from 'react';
import List from './components/List';

function App() {

  const draggable_list = useRef(null);
  const check = useRef(null);

  // const draggable_list = document.getElementById('draggable-list');
  // const check = document.getElementById('check');
  const [richestPeople, setRichestPeople] = useState(
    [
      'Jeff Bezos',
      'Bill Gates',
      'Warren Buffett',
      'Bernard Arnault',
      'Carlos Slim Helu',
      'Amancio Ortega',
      'Larry Ellison',
      'Mark Zuckerberg',
      'Michael Bloomberg',
      'Larry Page'
    ]
  )
  const [listItem, setListItem] = useState(null)
  const [dragStartIndex, setDragStartIndex] = useState(null)
  const [listItems, setListItems] = useState([])
  function createList() {
    
      
      [...richestPeople]
      .map(a => ({ value: a, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map((a, index) => listItems.push(
        (<List index={index} person={a.value} />)
      ))
      listItems.forEach(l => {
        console.log(l.children)
      })
    addEventListeners();
  }

  function dragStart() {
    // console.log('Event: ', 'dragstart');
    console.log(`Closest is ${Array.prototype.slice.call(draggable_list.current.children, 0).map((child) => child.closest())}`)
    dragStartIndex = +draggable_list.current.closest('li').getAttribute('data-index');
    console.log(`Closest is ${dragStartIndex}`)
  }

  function dragEnter() {
    // console.log('Event: ', 'dragenter');
    draggable_list.current.classList.add('over');
  }

  function dragLeave() {
    // console.log('Event: ', 'dragleave');
    draggable_list.current.classList.remove('over');
  }

  function dragOver(e) {
    // console.log('Event: ', 'dragover');
    e.preventDefault();
  }

  function dragDrop() {
    // console.log('Event: ', 'drop');
    const dragEndIndex = +draggable_list.current.getAttribute('data-index');
    swapItems(dragStartIndex, dragEndIndex);

    draggable_list.current.classList.remove('over');
  }

  // Swap list items that are drag and drop
  function swapItems(fromIndex, toIndex) {
    const itemOne = listItems[fromIndex].querySelector('.draggable');
    const itemTwo = listItems[toIndex].querySelector('.draggable');

    listItems[fromIndex].appendChild(itemTwo);
    listItems[toIndex].appendChild(itemOne);
  }

  // Check the order of list items
  function checkOrder() {
    listItems.forEach((listItem, index) => {
      const personName = listItem.querySelector('.draggable').innerText.trim();

      if (personName !== richestPeople[index]) {
        listItem.classList.add('wrong');
      } else {
        listItem.classList.remove('wrong');
        listItem.classList.add('right');
      }
    });
  }

  function addEventListeners() {
    const draggables = draggable_list.current.querySelectorAll('.draggable');
    const dragListItems = draggable_list.current.querySelectorAll('.draggable-list li');
    console.log(draggables)
    console.log(dragListItems)

    draggables.forEach(draggable => {
      draggable.addEventListener('dragstart', dragStart);
    });

    dragListItems.forEach(item => {
      item.addEventListener('dragover', dragOver);
      item.addEventListener('drop', dragDrop);
      item.addEventListener('dragenter', dragEnter);
      item.addEventListener('dragleave', dragLeave);
    });
  }
  useLayoutEffect(() => {
    createList()
    check.current.addEventListener('click', checkOrder);
    return () => {
    };
  }, [])
  return (
    <main>
      <h1>10 Richest People</h1>
      <p>Drag and drop the items into their corresponding spots</p>
      <ul className="draggable-list" id="draggable-list" ref={draggable_list}></ul>
      <button className="check-btn" id="check" ref={check}>
        Check Order
        <i className="fas fa-paper-plane"></i>
      </button>
    </main>
  );
}

export default App;
