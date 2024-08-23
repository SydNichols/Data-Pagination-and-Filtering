/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/

/*
`searchBar` function
This function will create the search bar, filter data, and dynamically change the page and button list. 
*/

function searchBar() {
   let header = document.querySelector('header');
   let searchHTML = `
      <label for="search" class="student-search">
      <span>Search by name</span>
      <input id="search" placeholder="Search by name...">
      <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
      </label>
   `;
   header.insertAdjacentHTML("beforeend", searchHTML);

   let searchInput = document.querySelector('#search');

   searchInput.addEventListener("keyup", (e) => {
      let searchValue = searchInput.value;
      searchValue = searchValue.toLowerCase();

      let filteredStudents = searchStudents(data, searchValue);
      console.log(filteredStudents);

      showPage(filteredStudents, 1);
      addPagination(filteredStudents);
   })

   
};

function searchStudents(rawList, value){
   
      let filteredStudents = [];

      for (const student in rawList) {
         let fullName = `${rawList[student].name.first} ${rawList[student].name.last}`
         fullName = fullName.toLowerCase();
         
         if (fullName.includes(value)) {
            filteredStudents.push(rawList[student])
         }
      }
      return filteredStudents;
}

/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/
function showPage(list, page) {
   const startIndex = (page * 9) - 9;
   const endIndex = page * 9;

   let studentList = document.querySelector('ul.student-list');
   studentList.innerHTML = '';

   if (list.length >= 1) {
      for (let i = 0; i < list.length; i++) {
         if (i >= startIndex && i < endIndex) {
            let studentItem = `
               <li class="student-item cf">
               <div class="student-details">
                  <img class="avatar" src="${list[i].picture.medium}" alt="Profile Picture">
                  <h3>${list[i].name.first} ${list[i].name.last}</h3>
                  <span class="email">${list[i].email}</span>
               </div>
               <div class="joined-details">
                  <span class="date">Joined ${list[i].registered.date}</span>
               </div>
               </li>
            `;
            studentList.insertAdjacentHTML("beforeend", studentItem);
         }
      }
   } else {
      const noneMsg = document.createElement('div');
      noneMsg.textContent = 'Sorry, no results were found';
      noneMsg.style.font = "italic 35px Helvetica";
      noneMsg.style.color = "#4a5568";
      studentList.append(noneMsg);     
   } 
 };

/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/
function addPagination (list) {
   let pagesNeeded = Math.ceil(list.length / 9);

   let linkList = document.querySelector('ul.link-list');
   linkList.innerHTML = '';

   for (let i = 1; i <= pagesNeeded; i++) {
      let button = `
         <li>
         <button type="button">${i}</button>
         </li>
      `;

      linkList.insertAdjacentHTML("beforeend", button);

      let firstButton = document.querySelector('ul button');
      firstButton.className = "active";
   }

   linkList.addEventListener("click", (e) => {
      if (e.target.tagName === 'BUTTON') {
         let activeButton = linkList.querySelector('.active');
         activeButton.className = '';
         e.target.className = 'active';

         let pageNum = e.target.textContent;
         //console.log(pageNum);
         showPage(list, pageNum);
      }
   })

 // console.log(pagesNeeded)
};


// Call functions
searchBar();
showPage(data, 1);
addPagination(data);