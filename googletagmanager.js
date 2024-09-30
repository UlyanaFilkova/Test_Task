(() => {
    "use strict";
 
    function e(a, t) {
       var o = t;
       Object.entries(a).forEach((a => {
          var [t, n] = a;
          null !== n && "object" == typeof n ? (t in o || (o[t] = new n.__proto__.constructor), e(n, o[t])) : o[t] = n
       }))
    }
 
    function a(e, a) {
       a.forEach((a => {
          e.push(a)
       }))
    }
 
    function t() {
       var e = app.tracking.trackingSystem();
       return e.init = function () {
          try {
             window.dataLayer = [];
             var e = {};
             ! function () {
                app.tracking || (app.tracking = {}), app.tracking.googletagmanager || (app.tracking.googletagmanager = {});
                var e = ["orderStep", "event", "ecommerce", "coupon"];
                app.tracking.tempdata = "", app.tracking.targetURL = "", app.tracking.googletagmanager.globalconfig = {
                   pageVariables: {
                      all: ["pageTitle", "pageCategory", "pageSubCategory", "pageCategoryID", "pageSubCategoryID", "pageCountryCode", "pageLanguageCode", "visitorLoginState", "hashedEmail", "oasis", "basketProducts", "event", "loyalty_id", "account_id"],
                      product_page: ["productID", "productStyleID", "productEAN", "productName", "productPrice", "productCategory", "productCurrency", "productColor", "productRealColor", "account_id"],
                      search_result: ["siteSearchTerm", "siteSearchFrom", "siteSearchCategory", "siteSearchResults", "ecommerce", "account_id"],
                      category: ["ecommerce"],
                      cart: e,
                      "checkout:step0": e,
                      "checkout:step1": e,
                      "checkout:step2": e,
                      "checkout:step3": e,
                      "checkout:confirmation": ["transactionId", "transactionDate", "transactionType", "transactionAffiliation", "transactionTotal", "transactionTotalGross", "transactionShipping", "transactionTax", "transactionPaymentType", "transactionCurrency", "transactionShippingMethod", "transactionPromoCode", "transactionProducts", "conversionDate", "conversionValue", "conversionType", "conversionId", "Email", "ecommerce", "account_id"]
                   },
                   pageEvents: {
                      all: ["accountLogin", "newsletterUnsubscribeSuccess", "newsletterSuccess", "colorChange", "productClick", "addToCart", "removeFromCart", "promotionClick"]
                   },
                   pageFunctions: {},
                   eventsLib: {
                      productClick: function () {
                         document.querySelector("body").addEventListener("productClick", (function () {
                            var e = app.tracking.tempdata;
                            app.tracking.googletagmanager.system.updateTrackingData(e, !1).then((function (e) {
                               var a = e;
                               a.event = "productClick", a.ecommerce = app.tracking.tempdata, "homepage" === app.tracking.pageid ? (a.pageCategoryID = "homepage", sessionStorage.setItem("previousPLPID", app.tracking.googletagmanager.data.pageCategoryID), sessionStorage.setItem("previousPageID", "homepage")) : "category" === app.tracking.pageid ? (sessionStorage.setItem("previousPLPID", app.tracking.googletagmanager.data.pageCategoryID), sessionStorage.setItem("previousPageID", "category")) : (sessionStorage.setItem("previousPLPID", ""), sessionStorage.setItem("previousPageID", "")), a.eventCallback = function () {
                                  document.location = app.tracking.targetURL
                               }, a.eventTimeout = 1e3, dataLayer.push(a), app.tracking.googletagmanager.system.logging("o", dataLayer), app.tracking.googletagmanager.system.logging("i", "Event : productClick")
                            }))
                         }))
                      },
                      addToCart: function () {
                         document.querySelector("body").addEventListener("addToCart", (function () {
                            var e = app.tracking.tempdata,
                               a = app.tracking.googletagmanager.data,
                               t = "";
                            "homepage" === app.tracking.pageid ? (a.pageCategoryID = app.tracking.pageid, t = app.tracking.pageid) : "category" === app.tracking.pageid ? t = a.pageCategoryID : "product_page" === app.tracking.pageid && (t = "product_page"), delete e.add.products[0].list, app.tracking.googletagmanager.system.updateTrackingData(e, !1).then((function (a) {
                               var o = a;
                               o.event = "addToCart", o.ecommerce = e, o.pageCategoryID = t, dataLayer.push(o), app.tracking.googletagmanager.system.logging("o", dataLayer), app.tracking.googletagmanager.system.logging("i", "Event : addToCart")
                            }))
                         }))
                      },
                      removeFromCart: function () {
                         document.querySelector("body").addEventListener("removeFromCart", (function () {
                            var e = app.tracking.tempdata;
                            app.tracking.googletagmanager.system.updateTrackingData(e, !1).then((function (e) {
                               var a = e;
                               a.event = "removeFromCart", a.ecommerce = app.tracking.tempdata, dataLayer.push(a), app.tracking.googletagmanager.system.logging("o", dataLayer), app.tracking.googletagmanager.system.logging("i", "Event : removeFromCart")
                            }))
                         }))
                      },
                      promotionClick: function () {
                         document.querySelector("body").addEventListener("promotionClick", (function (e) {
                            var a = app.tracking.tempdata,
                               t = e.detail.target;
                            app.tracking.googletagmanager.system.updateTrackingData(a, !1).then((function (e) {
                               var a = e;
                               a.event = "promotionClick", a.ecommerce = app.tracking.tempdata, "homepage" === app.tracking.pageid ? (sessionStorage.setItem("previousPLPID", app.tracking.googletagmanager.data.pageCategoryID), sessionStorage.setItem("previousPageID", "homepage")) : sessionStorage.setItem("previousPLPID", ""), a.eventCallback = function () {
                                  if ("object" != typeof app.tracking.targetURL)
                                     if (t) {
                                        var e = app.tracking.targetURL;
                                        window.open(e, t)
                                     } else document.location = app.tracking.targetURL
                               }, a.eventTimeout = 1e3, dataLayer.push(a), app.tracking.googletagmanager.system.logging("o", dataLayer), app.tracking.googletagmanager.system.logging("i", "Event : promotionClick")
                            }))
                         }))
                      },
                      colorChange: function () {
                         document.querySelector("body").addEventListener("colorChange", (function (e) {
                            var a = {
                               pid: e.pid,
                               pageid: "product_page"
                            };
                            e.color && (a.selectedColor = e.color), app.tracking.googletagmanager.system.updateTrackingData(a, !1).then((function (e) {
                               var a = e;
                               a.pageTitle = dataLayer[0].pageTitle, a.event = "colorChange", dataLayer.push(a), app.tracking.googletagmanager.system.logging("o", dataLayer), app.tracking.googletagmanager.system.logging("i", "Event : colorChange")
                            }))
                         }))
                      },
                      newsletterSuccess: function () {
                         document.querySelector("body").addEventListener("newsletterSuccess", (function () {
                            app.tracking.googletagmanager.system.updateTrackingData({
                               pageid: "account:newsletter:ok"
                            }, !1).then((function (e) {
                               var a = e;
                               a.pageTitle = dataLayer[0].pageTitle, a.event = "newsletterSuccess", dataLayer.push(a), app.tracking.googletagmanager.system.logging("o", dataLayer), app.tracking.googletagmanager.system.logging("i", "Event : newsletterSuccess")
                            }))
                         }))
                      }
                   },
                   functionsLib: {},
                   customEventsLib: {
                      productClick: function () {
                         return new CustomEvent("productClick", {
                            detail: {
                               message: "product clicked",
                               time: new Date
                            },
                            bubbles: !0,
                            cancelable: !0
                         })
                      },
                      productImpressions: function () {
                         return new CustomEvent("productImpressions", {
                            detail: {
                               message: "product impression",
                               time: new Date
                            },
                            bubbles: !0,
                            cancelable: !0
                         })
                      },
                      addToCart: function () {
                         return new CustomEvent("addToCart", {
                            detail: {
                               message: "product addToCart",
                               time: new Date
                            },
                            bubbles: !0,
                            cancelable: !0
                         })
                      },
                      removeFromCart: function () {
                         return new CustomEvent("removeFromCart", {
                            detail: {
                               message: "product removeFromCart",
                               time: new Date
                            },
                            bubbles: !0,
                            cancelable: !0
                         })
                      },
                      promotionClick: function (e) {
                         return new CustomEvent("promotionClick", {
                            detail: {
                               message: "promotionClick",
                               time: new Date,
                               target: e
                            },
                            bubbles: !0,
                            cancelable: !0
                         })
                      },
                      colorChange: function () {
                         return new CustomEvent("colorChange", {
                            detail: {
                               message: "Color changed.",
                               time: new Date
                            },
                            bubbles: !0,
                            cancelable: !0
                         })
                      },
                      newsletterSuccess: function () {
                         return new CustomEvent("newsletterSuccess", {
                            detail: {
                               message: "Subscription completed.",
                               time: new Date
                            },
                            bubbles: !0,
                            cancelable: !0
                         })
                      }
                   }
                }
             }(), this.bindEvents(), this.setPageData(e);
             var a = this;
             new Promise((function (a) {
                var t = {};
                new Promise((a => {
                   if ("product_page" === app.tracking.pageid) {
                      var o = window.location.search ? window.location.search.substring(1) : "",
                         n = "",
                         g = "";
                      if (o && o.length > 0) {
                         var r = new URLSearchParams(window.location.search);
                         n = r.get("color") ? r.get("color") : "", g = r.get("size") ? r.get("size") : ""
                      }
                      e.productID && n && (t = {
                         pageid: app.tracking.pageid,
                         pid: e.productID,
                         selectedColor: n,
                         selectedSize: g
                      }, app.tracking.googletagmanager.system.updateTrackingData(t, !1).then((function (a) {
                         e = a
                      })).finally((function () {
                         a()
                      })))
                   } else a()
                })).then((function () {
                   t = {
                      pageid: app.tracking.pageid
                   }, app.tracking.googletagmanager.system.updateTrackingData(t, !1).then((function (t) {
                      e.basketProducts = t.basketProducts, localStorage.getItem("list") && "product_page" === app.tracking.pageid && (e.ecommerce.detail.actionField.list = localStorage.list, localStorage.removeItem("list")), a()
                   }))
                }))
             })).then((function () {
                var t = JSON.parse(JSON.stringify(e));
                Object.hasOwnProperty.call(t, "ecommerce") && Object.hasOwnProperty.call(t.ecommerce, "impressions") && delete t.ecommerce.impressions, window.dataLayer.push(t), window.dataLayer.push({
                   "gtm.start": (new Date).getTime(),
                   event: "gtm.js"
                });
                var o = app.tracking.googletagmanager.fileUrl + "?id=" + app.tracking.googletagmanager.id;
                a.loadLibrary(o), a.logging("i", "Google Tag Manager successfully initialized"), a.logging("o", window.dataLayer)
             }))
          } catch (e) {
             this.logging("o", e)
          }
       }, e
    }! function (o) {
       o ? (o.tracking || (o.tracking = {}), o.tracking.googletagmanager || (o.tracking.googletagmanager = {}), o.tracking.googletagmanager.globalconfig || (o.tracking.googletagmanager.globalconfig = {}), o.tracking = {
          visibleProducts: {
             knownIDs: [],
             toBeTracked: [],
             data: []
          },
          lastTrackTimestamp: (new Date).getTime(),
          initDataObject: function (a) {
             a && e(a, this)
          },
          initGTM: function () {
             o.tracking.googletagmanager.system = t(), this.googletagmanager.isEnable && this.googletagmanager.system && this.googletagmanager.id ? this.googletagmanager.system.init() : this.logging("e", "Google Tag Manager lib Url empty!")
          },
          trackingSystem: function () {
             return {
                loadLibrary: function (e) {
                   try {
                      var a = document.getElementsByTagName("script")[0],
                         t = document.createElement("script");
                      t.async = !0, t.src = "Function" === this.getConstructorName(e) ? e() : e, a.parentNode.insertBefore(t, a), this.logging("i", "Start asynchronous loading of lib from " + t.src)
                   } catch (e) {
                      this.logging("e", "Asynchronous loading of library failed."), this.logging("o", e)
                   }
                },
                updateTrackingData: function (a, t) {
                   var n = o.tracking.updateDataUrl || "";
                   if (n) {
                      var g = {};
                      a ? g = a : (this.logging("w", "URL parameters are empty!"), g.pageid = "other");
                      var r = this;
                      return new Promise((function (a, i) {
                         try {
                            var c = new URLSearchParams(g).toString(),
                               s = new XMLHttpRequest;
                            s.open("GET", n + "?" + c), s.responseType = "json", s.onload = function () {
                               200 === s.status ? this.response && !this.response.error ? t ? (o.tracking.googletagmanager.data.basketProducts = this.response.trackingData.googletagmanager.data.basketProducts, e(this.response.trackingData.googletagmanager.data, o.tracking.googletagmanager.data), r.logging("i", "Updating data for googletagmanager ended with success."), a(o.tracking.googletagmanager.data)) : a(this.response.trackingData.googletagmanager.data) : this.response ? (r.logging("e", "Updating data for googletagmanager failed. " + this.response.error), i()) : (r.logging("e", "Updating data for googletagmanager failed. Empty data after AJAX call"), i()) : (r.logging("e", "Updating data for googletagmanager failed."), i())
                            }, s.send()
                         } catch (e) {
                            r.logging("e", "Updating data for googletagmanager failed."), r.logging("o", e), i()
                         }
                      }))
                   }
                   this.logging("e", "update URL is empty!")
                },
                setPageData: function (e) {
                   var t = e || {};
                   try {
                      var n = o.tracking.googletagmanager.globalconfig.pageVariables || {};
                      if (this.isEmpty(n)) return void this.logging("w", "pageVariables attribute is empty!");
                      var g = n[o.tracking.pageid] || [],
                         r = n.all || [];
                      if ("Array" === this.getConstructorName(g) && "Array" === this.getConstructorName(r)) {
                         a(g, r);
                         for (var i = 0; i < g.length; i++) {
                            var c = g[i];
                            t[c] = o.tracking.googletagmanager.data[c] ? o.tracking.googletagmanager.data[c] : ""
                         }
                         this.logging("i", "Attributes successfully added to the Data Object")
                      } else this.logging("e", "Wrong data format for pageVariables. Array needed!")
                   } catch (e) {
                      this.logging("e", "Filling data to the Data Object for googletagmanager failed."), this.logging("o", e)
                   }
                   return t
                },
                bindEvents: function () {
                   try {
                      var e = o.tracking.googletagmanager.globalconfig.eventsLib;
                      if (this.isEmpty(e)) return void this.logging("w", "eventsLib is empty!");
                      var t = o.tracking.googletagmanager.globalconfig.pageEvents;
                      if (this.isEmpty(t)) return void this.logging("w", "pageEvents attribute is empty!");
                      var n = t[o.tracking.pageid] || [],
                         g = t.all || [];
                      if ("Array" === this.getConstructorName(n) && "Array" === this.getConstructorName(g)) {
                         a(n, g);
                         for (var r = 0; r < n.length; r++) {
                            var i = n[r];
                            e[i] && e[i](o.tracking.googletagmanager.data)
                         }
                         this.logging("i", "Binding events for googletagmanager ended with success.")
                      } else this.logging("e", "Wrong data format for pageEvents. Array needed!")
                   } catch (e) {
                      this.logging("e", "Binding events for googletagmanager failed."), this.logging("o", e)
                   }
                },
                getConstructorName: function (e) {
                   var a = /function (.{1,})\(/.exec(e.constructor.toString());
                   return a && a.length > 1 ? a[1] : ""
                },
                isEmpty: function (e) {
                   return 0 === Object.keys(e).length
                },
                addCustomEvent: function () {
                   function e(e, a) {
                      var t;
                      t = a || {
                         bubbles: !1,
                         cancelable: !1,
                         detail: void 0
                      };
                      var o = document.createEvent("CustomEvent");
                      return o.initCustomEvent(e, t.bubbles, t.cancelable, t.detail), o
                   }
                   this.logging("i", "CustomEvent() constructor functionality added"), e.prototype = window.Event.prototype, window.CustomEvent = e
                },
                logging: function (e, a) {
                   if (o.tracking && o.tracking.logEnable && a && "undefined" != typeof console && void 0 !== console.log) switch (e.toLowerCase()) {
                      case "i":
                         void 0 !== console.info ? console.info("INFO: " + a) : console.log(a);
                         break;
                      case "w":
                         void 0 !== console.warn ? console.warn("WARNING: " + a) : console.log(a);
                         break;
                      case "e":
                         void 0 !== console.error ? console.error("ERROR: " + a) : console.log(a);
                         break;
                      case "o":
                         void 0 !== console.dir ? console.dir(a) : console.log(a);
                         break;
                      default:
                         console.log(a)
                   }
                }
             }
          }
       }) : console.log("app namespace is not loaded yet!")
    }(app)
 })();