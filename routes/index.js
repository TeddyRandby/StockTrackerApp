"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const route = require("./route.js");
const request = require("superagent");

class IndexRoute extends route.BaseRoute {
    static create(router) {

        console.log("[IndexRoute::create] Creating index route.");

        // Home page route
        router.get("/", (req, res, next) => {
            new IndexRoute().index(req, res, next);
        });

        // Test API Call route
        router.get("/IEXCall", (req, res, next) => {
            new IndexRoute().IEXCall(req, res, next);
        });


    }

    constructor() {
        super();
    }

    // Home Page
    index(req, res, next) {

      var options = {

        symbol: "",
        latestPrice: ""

       };

      this.render(req, res, "index", options);
    }

    // Test IEX Call
    IEXCall(req, res, next) {

      console.log("making IEX call...");

      var options = {

        symbol: "",
        latestPrice: ""

       };


      var symbol = req.query.symbol;

      request
        .get('https://api.iextrading.com/1.0/stock/' + symbol + '/batch')
        .query({
          types: 'quote',
          range: '1m',
          last: 1
        })
        .then( response => {

          var quote = response.body.quote;

          options.latestPrice = quote.latestPrice;
          options.symbol = quote.symbol;

          this.render(req, res, 'index', options);
        })
        .catch( error => {
          next(error);
        });
      }
  }


exports.IndexRoute = IndexRoute;
