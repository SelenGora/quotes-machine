const quotes = 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json';
const textContainer = document.querySelector('#text');
const authorContainer = document.querySelector('#author');
const tweetQuote = document.querySelector('#tweet-quote');
function ajax_get(url, callback) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {            
            try {
                var data = JSON.parse(xmlhttp.responseText);
            } catch(err) {
                console.log(err.message + " in " + xmlhttp.responseText);
                return;
            }
            callback(data);
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}
ajax_get(quotes, function(data) {
    let quoteIndex = Math.floor(Math.random() * data.quotes.length);
    let twitterLink = 'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text='+data.quotes[quoteIndex].quote+'~'+data.quotes[quoteIndex].author
    textContainer.innerHTML = data.quotes[quoteIndex].quote;
    authorContainer.innerHTML = '~ '+ data.quotes[quoteIndex].author;
    tweetQuote.setAttribute('href',twitterLink);
    document.getElementById('new-quote').addEventListener('click', function () {
        quoteIndex = Math.floor(Math.random() * data.quotes.length);
        textContainer.innerHTML = data.quotes[quoteIndex].quote;
        authorContainer.innerHTML = '~ '+ data.quotes[quoteIndex].author; 
    });
});