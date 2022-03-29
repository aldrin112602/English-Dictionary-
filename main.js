let fa_times = document.querySelector('#fa_times');
  let fa_search = document.querySelector('#fa_search');
  let input = document.querySelector('#text');
  let header = document.querySelector('.res1 h3');
  header_span = document.querySelector('.res1 span');
  let span_meaning = document.querySelector('.res2 span');
  let example_span = document.querySelector('.res3 span');
  let synonyms_span = document.querySelector('.res4 span');
  let antonyms_span = document.querySelector('.res5 span');
  let origin_span = document.querySelector('.origin span');
  input.oninput = () => {
    if(input.value.length != 0) {
      fa_times.style.opacity = 1;
      fa_search.style.color = '#666';
    } else {
      fa_times.style.opacity = 0;
      fa_search.style.color = '#ddd';
    }
  }
  fa_times.onclick = () => { 
    input.value = ''; 
    fa_search.style.color = '#ddd'; 
    fa_times.style.opacity = 0;
    
  };
  let audio = new Audio(), definition;
  let origin, example, antonyms;
 const findWord = () => {
   if(input.value.length != 0) {
   fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${input.value}`)
   .then(response => response.json())
   .then((res) => {
   if(res.message != undefined) {
      alert(`${res.title} \n\n ${res.message}`);
   }
  
     audio.src = res[0].phonetics[0].audio;
     let word = res[0].word;
     header.innerHTML = word;
     let phonetic = res[0].phonetic;
     origin = res[0].origin;
     if(origin != undefined) {
     origin_span.innerHTML = origin;
     } else {
       origin_span.innerHTML ='none';
     }
     let partOfSpeech = res[0].meanings[0].partOfSpeech;
     header_span.innerHTML = `${partOfSpeech} / ${phonetic}`;
    definition = res[0].meanings[0].definitions[0].definition;
    span_meaning.innerHTML = definition;
    example = res[0].meanings[0].definitions[0].example;
    if(example != undefined) {
      example_span.innerHTML = example;
    } else {
      example_span.innerHTML = 'none';
    }
    synonyms = res[0].meanings[0].definitions[0].synonyms;
    if(synonyms.length > 0) {
      synonyms_span.innerHTML = synonyms.join(', ');
    } else {
      synonyms_span.innerHTML = 'none';
    }
    antonyms = res[0].meanings[0].definitions[0].antonyms;
    if(antonyms.length > 0) {
       antonyms_span.innerHTML = antonyms.join(', ');
    } else {
      antonyms_span.innerHTML = 'none';
    }
    
    document.querySelector('.content').style.display ='block';
    document.querySelector('.center').style.display ='none';
    
      })
    }
 }
 
 let form = document.getElementById('form');
  form.onsubmit = (e) => {
   e.preventDefault();
   findWord();
  }
  fa_search.onclick = () => {
    findWord();
  }
  
  playSound = () => audio.play();
  let msg = new SpeechSynthesisUtterance();
  Speak_meaning = () => {
    msg.text = 'meaning: ' + definition;
    window.speechSynthesis.speak(msg);
  }
  Speak_origin = () => {
    if(origin != undefined) {
      msg.text = 'origin: ' + origin;
    } else {
      msg.text = 'origin: none';
    }
    
    window.speechSynthesis.speak(msg);
  }
  Speak_example = () => {
    if(example != undefined) {
      msg.text = 'Example: ' + example;
    } else {
      msg.text = 'example: none';
    }
  
  window.speechSynthesis.speak(msg);
  }
  
  Speak_synonyms = () => {
  msg.text = 'Synonyms: ' + synonyms_span.innerHTML;
  window.speechSynthesis.speak(msg);
  }
  
  Speak_antonyms = () => {
  msg.text = 'antonyms: ' + antonyms_span.innerHTML;
  window.speechSynthesis.speak(msg);
  }
  
