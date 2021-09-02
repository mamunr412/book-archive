const getinput = () => {
    const inputfield = document.getElementById("input-field");
    const searchtext = inputfield.value;
    inputfield.value = searchtext;
    inputfield.value = '';
    // load book api 
    const url = `http://openlibrary.org/search.json?q=${searchtext}`;

    fetch(url)
        .then(res => res.json())
        .then(data => displayBook(data))
}
// display data 
const displayBook = data => {
    const searchResult = document.getElementById("display-books");
    const count = document.getElementById("books-count");
    // error 
    if (data.docs.length === 0) {
        count.innerHTML = `<h3 class="text-center">No result found</h3>`
    }
    else {
        count.innerHTML = `<h3 class="mb-5"> ${data.numFound} hits</h3>`
    }
    // slice all data
    const allData = data.docs;
    const dataslice = allData.slice(0, 12)
    // show all data in display
    dataslice?.forEach(book => {
        console.log(book)
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card">
                <img id="image" src="https://covers.openlibrary.org/b/id/${book.cover_i ? book.cover_i : ''}-M.jpg"class="card-img-top img-fluid" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${book.title}</h5>
                    <h56>Author: ${book.author_name[0]}</h6>
                    <br>
                    <h56>Publisher: ${book.publisher}</h6>
                    <br>
                    <h56>Publish Year: ${book.first_publish_year}</h6>
                    
                </div>
            </div>`
        searchResult.appendChild(div);
    })
}

