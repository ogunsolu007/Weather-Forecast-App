//getting the long and lat of my location
window.addEventListener("load", () => {
  let long;

  let lat;

  let temperaturedesc = document.querySelector(".temperature-description");
  let temperaturedegree = document.querySelector(".temperature-degree");
  let locationtime = document.querySelector(".location-timezone");

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      long = position.coords.longitude;
      lat = position.coords.latitude;
      console.log(position);

      const proxy = "https://cors-anywhere.herokuapp.com/";
      const api = `${proxy}https://api.darksky.net/forecast/fd9d9c6418c23d94745b836767721ad1/${lat},${long}`;
      fetch(api)
        .then((data) => {
          return data.json();
        })
        .then((response) => {
          console.log(response);
          const { temperature, summary, icon } = response.currently;
          temperaturedegree.textContent = temperature;
          temperaturedesc.textContent = summary;
          locationtime.textContent = response.timezone;
          seticons(icon, document.querySelector(".icon"));
        });
    });
  }

  function seticons(icon, iconID) {
    const skycons = new Skycons({ color: "white" });
    const currenticon = icon.replace(/-/g, "_").toUpperCase();
    skycons.play();
    return skycons.set(iconID, Skycons[currenticon]);
  }
});
