// Initialize Firebase
// Add your firebase database initialization data here

  var numOfSwims = 0
  var numOfSupports = 0

  if (getCookie('supported') == 'true') {
    document.getElementById('add').innerHTML = "<h2>Thanks for supporting the team!</h2>"
  }

  firebase.database().ref('swimteam').on('child_added', function(data) {
    if (data.val().wants == "swim") {
      document.getElementById('swimmers').innerHTML += '<li>' + data.val().name + '</li>'
      numOfSwims++
    } else {
      document.getElementById('supporters').innerHTML += '<li>' + data.val().name + '</li>'
      numOfSupports++
    }
    document.getElementById('numOfSupports').innerHTML = numOfSwims + " people will swim, and " + numOfSupports + " will support Barstow High School Co-Ed Swim Team!"
  })

  function addSupport() {
    if (document.getElementById('name').value != "") {
      if (document.getElementById('swim').checked == true) {
        firebase.database().ref('swimteam/' + (numOfSwims+numOfSupports+1)).set({
          "name" : document.getElementById('name').value,
          "wants" : "swim"
        }, function(err) {
          if (err) {
            alert('An error occured! Try again later.')
          } else {
            setCookie('supported', true, 100)
            document.getElementById('add').innerHTML = "<h2>Thanks for supporting the team!</h2>"
          }
        })
      } else {
        firebase.database().ref('swimteam/' + (numOfSigns+1)).set({
          "name" : document.getElementById('name').value,
          "wants" : "support"
        }, function(err) {
          if (err) {
            alert('An error occured! Try again later.')
          } else {
            setCookie('supported', 'true', 100)
            document.getElementById('add').innerHTML = "<h2>Thanks for supporting the team!</h2>"
          }
        })
      }
    } else {
      alert('A name is required.')
    }
  }

  function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
  }

  function getCookie(cname) {
      var name = cname + "=";
      var ca = document.cookie.split(';');
      for(var i=0; i<ca.length; i++) {
          var c = ca[i];
          while (c.charAt(0)==' ') {
              c = c.substring(1);
          }
          if (c.indexOf(name) == 0) {
              return c.substring(name.length, c.length);
          }
      }
      return "";
  }
