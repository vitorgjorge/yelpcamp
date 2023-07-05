mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mapbox/streets-v12", // stylesheet location
    center: campground.geometry.coordinates, // starting position [lng, lat]
    zoom: 11, // starting zoom
});

new mapboxgl.Marker()
    .setLngLat(campground.geometry.coordinates)
    .setPopup(
        new mapboxgl.Popup({offset:25})
            .setHTML(`<h3>${campground.title}</h3><p>$${campground.price}/night</p>`)
            .addTo(map)
    )
    .addTo(map);

map.addControl(new mapboxgl.NavigationControl());