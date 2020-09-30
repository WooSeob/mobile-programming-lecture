const Location = require("../models/locations");

const homelist = (req, res) => {
  Location.find()
    .then((data) => {
      let locations = data.map((v) => {
        let loc = {
          name: v.name,
          address: v.address,
          rating: v.rating,
          facilities: v.facilities,
          distance: "100m", //계산으로 수정
        };
        return loc;
      });

      res.render("locations-list", {
        title: "Loc8r - find a place to work with wifi",
        pageHeader: {
          title: "Loc8r",
          strapline: "Find places to work with wifi near you!",
        },
        sidebar:
          "Looking for wifi and a seat? Loc8r helps you find places to work\
        when out and about. Perhaps with coffee, cake or a pint? \
        Let Loc8r help you find the place you're looking for.",
        locations: locations,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

const locationInfo = (req, res) => {
  res.render("location-info", {
    title: "Starcups",
    pageHeader: { title: "Starcups" },
    sidebar: {
      context:
        "is on Loc8r because it has accessible wifi and space to sit down with your laptop and get some work don.",
      callToAction:
        "If you've been and you like it - or if you don't - please leave a review to help other people just like you.",
    },
    location: {
      name: "Starcups",
      address: "서울특별시 관악구 호암로 100",
      rating: 3,
      facilities: ["Hot drinks", "Food", "Premium wifi"],
      coords: { lat: 37.0116648, lng: 127.2620489 },
      openingTimes: [
        {
          days: "Monday - Friday",
          opening: "7:00am",
          closing: "7:00pm",
          closed: false,
        },
        {
          days: "Saturday",
          opening: "8:00am",
          closing: "5:00pm",
          closed: false,
        },
        {
          days: "Sunday",
          closed: true,
        },
      ],
      reviews: [
        {
          author: "Simon Holmes",
          rating: 5,
          timestamp: "16 July 2013",
          reviewText:
            "What a great place. I can't say enough good things about it.",
        },
        {
          author: "Charlie Chaplin",
          rating: 3,
          timestamp: "16 June 2013",
          reviewText:
            "It was okay. Coffee wasn't great, but the wifi was fast.",
        },
      ],
    },
  });
};

const addReview = (req, res) => {
  res.render("location-review-form", {
    title: "Review Starcups on Loc8r",
    pageHeader: { title: "Review Starcups" },
  });
};

module.exports = {
  homelist,
  locationInfo,
  addReview,
};
