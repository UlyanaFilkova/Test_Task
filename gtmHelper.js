window.GTM = {
    triggerGlobalUpdate(t, e, a, r) {
       var o = !(arguments.length > 4 && void 0 !== arguments[4]) || arguments[4],
          c = {};
       app.tracking.trackingSystem().setPageData(c), void 0 !== app.tracking.googletagmanager.system && (e.pageid = app.tracking.pageid, "cart" === e.pageid && ["colorChange", "sizeChange", "removeFromCart", "addToCart"].includes(t) ? e.pageid = "cart_edit" : "category" === e.pageid && ["colorChange"].includes(t) && (e.pageid = "category_edit"), Object.prototype.hasOwnProperty.call(e, "pid") || (void 0 !== c.productID ? e.pid = c.productID : void 0 !== app.tracking.tempdata.click ? e.pid = app.tracking.tempdata.click.products[0].id : void 0 !== app.tracking.tempdata.remove && (e.pid = app.tracking.tempdata.remove.products[0].ean)), app.tracking.googletagmanager.system.updateTrackingData(e, a).then((function (c) {
          if ("undefined" != typeof dataLayer) {
             if (c.pageTitle = dataLayer[0].pageTitle, c.event = t, !0 === a && (c.ecommerce = e), ["quantityChange", "sizeChange", "removeFromCart"].includes(t) && r && GTM.clearBasketProducts(), ["quantityChange", "sizeChange"].includes(t) && r && (c.basketProducts = e.basketProducts), ["colorChange"].includes(t)) {
                var i = ["event", "productID", "productStyleID", "productEAN", "productName", "productPriceWithoutTax", "productCurrency", "productColor", "productSize", "productRealColor", "productPrice", "productSalePrice", "productDiscountFlag", "productVAT", "productDiscount", "productDiscountValueWithoutTax", "productFlags", "productArea", "productProductType", "productPrimaryCategory", "productSubbrand", "productSeriesID", "productSeriesName", "productProductLine", "productDepartment", "ecommerce"];
                Object.keys(c).forEach((function (t) {
                   i.includes(t) || delete c[t]
                }))
             }
             dataLayer.push(JSON.parse(JSON.stringify(c))), app.tracking.googletagmanager.system.logging("o", dataLayer), app.tracking.googletagmanager.system.logging("i", "Event : " + t), "productClick" === t && !0 === o && (document.location = app.tracking.targetURL)
          }
       })))
    },
    getTrackingDataFromElement(t) {
       var e = t.getAttributeNames(),
          a = {};
       return e.forEach((e => {
          if (-1 !== e.indexOf("data-gtm"))
             if ("data-gtm-currencycode" === e) a.currencyCode = t.getAttribute(e);
             else {
                var r = e.split("-")[2]; - 1 !== r.indexOf("-") && (r = r.split("-")[0] + r.split("-")[1].charAt(0).toUpperCase() + r.split("-")[1].slice(1)), a[r] = "" + t.getAttribute(e)
             }
       })), -1 === t.getAttribute("data-gtm-list").indexOf(",") && (["search_result", "other"].some((t => app.tracking.googletagmanager.data.pageCategoryID.includes(t))) ? a.list = app.tracking.googletagmanager.data.pageCategory : a.list = app.tracking.googletagmanager.data.pageCategoryID, a.list += "," + t.getAttribute("data-gtm-list"), void 0 !== app.tracking.googletagmanager.data.productID && (a.list += "," + app.tracking.googletagmanager.data.productID)), a
    },
    trackProductClick(t, e) {
       var a = !(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2];
       e.preventDefault();
       var r = t.closest(".js-productTileLink"),
          o = this.getTrackingDataFromElement(r),
          c = o.list;
       localStorage.setItem("list", c), delete o.list, app.tracking.targetURL = r.getAttribute("href"), app.tracking.tempdata = {
          click: {
             actionField: {
                list: c
             },
             products: [o]
          }
       };
       try {
          return this.triggerGlobalUpdate("productClick", app.tracking.tempdata, !0, null, a), !1
       } catch (t) {}
    },
    trackColorChange(t, e) {
       var a = {
          selectedColor: e,
          ean: t,
          actionFieldList: this.getActionFieldList("colorChange")
       };
       document.querySelector(".js-sizeSelector.pdp__size--selector") && document.querySelector(".js-gtm-matching-products") ? a.pid = document.querySelector(".js-gtm-matching-products").dataset.gtmId : document.querySelector(".cart__selectionButton--selectedSize") ? a.pid = document.querySelector(".cart__selectionButton--selectedSize").dataset.masterid : document.querySelector(".js-gtm-matching-products.productTile") && (a.pid = document.querySelector(".js-gtm-matching-products").dataset.gtmId), this.triggerGlobalUpdate("colorChange", a, !1)
    },
    trackSingleProduct: t => ({
       id: t.getAttribute("data-gtm-id") || "",
       name: t.getAttribute("data-gtm-name") || "",
       ean: t.getAttribute("data-gtm-ean") || t.getAttribute("data-ean"),
       item_category: t.getAttribute("data-gtm-categoryid") || "",
       price: "" + Math.round(100 * parseFloat(t.getAttribute("data-gtm-price"))) / 100,
       quantity: "" + parseInt(t.getAttribute("data-gtm-quantity"), 10),
       styleId: t.getAttribute("data-gtm-style-id") || "",
       category: t.getAttribute("data-gtm-category") || "",
       variant: t.getAttribute("data-gtm-variant") || "",
       dimension10: t.getAttribute("data-gtm-dimension10") || "",
       dimension11: t.getAttribute("data-gtm-dimension11") || "",
       dimension12: t.getAttribute("data-gtm-dimension12") || "",
       dimension13: t.getAttribute("data-gtm-dimension13") || ""
    }),
    trackAllProducts() {
       var t = [];
       return document.querySelectorAll(".js-cart-remove").forEach((e => {
          var a = this.trackSingleProduct(e);
          t.push(a)
       })), t
    },
    trackSizeChange(t, e, a) {
       var r = {
          size: a,
          ean: e,
          actionFieldList: this.getActionFieldList("sizeChange")
       };
       t && (r.basketProducts = [this.trackSingleProduct(t)]), document.querySelector(".js-colorDot.colorDot--clicked") && document.querySelector(".js-gtm-matching-products") ? r.pid = document.querySelector(".js-gtm-matching-products").dataset.gtmId : document.querySelector(".cart__selectionButton--selectedColor") && document.querySelector(".cart__selectionButton--selectedSize") && (r.pid = document.querySelector(".cart__selectionButton--selectedSize").dataset.masterid);
       var o = !!t;
       this.triggerGlobalUpdate("sizeChange", r, !1, o)
    },
    trackQuantityChange(t) {
       var e = {
          basketProducts: [this.trackSingleProduct(t)]
       };
       try {
          this.triggerGlobalUpdate("quantityChange", e, !1, !0)
       } catch (t) {}
    },
    trackAddToCart() {
       var t = document.querySelectorAll(".js-minicart-remove")[0] || document.querySelectorAll(".js-addGiftBag")[0] || document.querySelectorAll(".js-removeGiftBag")[0];
       app.tracking.tempdata = {
          currencyCode: t.getAttribute("data-gtm-currencycode"),
          add: {
             products: [this.trackSingleProduct(t)]
          },
          ean: t.getAttribute("data-gtm-ean")
       };
       try {
          this.triggerGlobalUpdate("addToCart", app.tracking.tempdata, !0, !0)
       } catch (t) {}
    },
    trackRemoveFromCart(t) {
       var e = this.trackAllProducts(),
          a = t;
       app.tracking.tempdata = {
          remove: {
             products: [this.trackSingleProduct(a)]
          }
       }, e.length && (app.tracking.tempdata.checkout = {
          products: e
       });
       try {
          this.triggerGlobalUpdate("removeFromCart", app.tracking.tempdata, !0, !0)
       } catch (t) {}
    },
    trackNewsletterSubscribedSuccess() {
       dataLayer.push({
          location: "storefront",
          event: "newsletterSubscribedSuccess"
       })
    },
    trackNewsletterUnsubscribedSuccess() {
       dataLayer.push({
          location: "storefront",
          event: "newsletterUnsubscribedSuccess"
       })
    },
    trackAccountLogin(t, e, a) {
       null === sessionStorage.getItem("loginTracked") && (sessionStorage.setItem("loginTracked", !0), dataLayer.push({
          location: t,
          loyalty_id: a,
          account_id: e,
          login_method: "email",
          event: "accountLogin"
       }))
    },
    trackAccountRegistration(t, e) {
       null === sessionStorage.getItem("registrationTracked") && (sessionStorage.setItem("registrationTracked", !0), dataLayer.push({
          acceptedmytriumph: null != e.match(/^[0-9]+$/),
          loyalty_id: e,
          account_id: t,
          event: "accountRegistration"
       }))
    },
    clearBasketProducts: function () {
       dataLayer.push({
          basketProducts: null
       })
    },
    clearEcommerce: function () {
       dataLayer.push({
          ecommerce: null
       })
    },
    trackImpressions: function () {
       for (var t = [], e = 0; e < app.tracking.visibleProducts.toBeTracked.length; e += 24) t.push(app.tracking.visibleProducts.toBeTracked.slice(e, e + 24));
       app.tracking.visibleProducts.toBeTracked = [], t.forEach((function (t) {
          var e = [];
          t.forEach((t => {
             app.tracking.visibleProducts.data[t] && e.push(app.tracking.visibleProducts.data[t])
          })), e.length > 0 && (GTM.clearEcommerce(), dataLayer.push({
             event: "productsImpressions",
             currencyCode: e[0].currencyCode,
             ecommerce: {
                impressions: e
             }
          }), app.tracking.googletagmanager.system.logging("o", dataLayer), app.tracking.googletagmanager.system.logging("i", "Event : productsImpressions"))
       })), app.tracking.lastTrackTimestamp = Date.now()
    },
    trackPromoViewsAndClicks: function () {
       var t = document.querySelectorAll(".js-pdComponent, .js-teaserTileComponent"),
          e = new IntersectionObserver((function (t) {
             t.forEach((function (t) {
                if (t.isIntersecting) {
                   var a = t.target.dataset.gtm_id,
                      r = t.target.dataset.gtm_name,
                      o = t.target.dataset.gtm_creative,
                      c = t.target.dataset.gtm_position,
                      i = t.target.dataset.gtm_slide;
                   GTM.clearEcommerce(), dataLayer.push({
                      event: "promoView",
                      ecommerce: {
                         promoView: {
                            promotions: [{
                               id: a,
                               name: r,
                               creative: o,
                               position: c,
                               slide: i
                            }]
                         }
                      }
                   }), e.unobserve(t.target)
                }
             }))
          }), {
             threshold: .5
          }),
          a = 0,
          r = !1;
       t.forEach((function (t) {
          var o = t;
          o.dataset.gtm_slide || (o.dataset.gtm_slide = 1), o.dataset.gtm_position = "1" === o.dataset.gtm_slide ? ++a : a, e.observe(o);
          var c = o.querySelectorAll(".js-pdComponentClick, .js-trackLink a, .js-teaserTileComponentClick");
          if (c.length > 0) {
             var i = o.dataset.gtm_id,
                n = o.dataset.gtm_name,
                d = o.dataset.gtm_creative,
                s = o.dataset.gtm_position,
                g = o.dataset.gtm_slide;
             c.forEach((function (t) {
                t.addEventListener("click", (function () {
                   if (r) return !1;
                   r = !0, setTimeout((() => {
                      r = !1
                   }), 1e3), GTM.clearEcommerce(), t.dataset.gtm_name && (n = t.dataset.gtm_name), dataLayer.push({
                      event: "promoClick",
                      ecommerce: {
                         promoClick: {
                            promotions: [{
                               id: i,
                               name: n,
                               creative: d,
                               position: s,
                               slide: g
                            }]
                         }
                      }
                   })
                }))
             }))
          }
       }))
    },
    getActionFieldList: function (t) {
       var e = localStorage.getItem("actionlist") ? JSON.parse(localStorage.getItem("actionlist")) : [];
       return e.includes(t) || e.push(t), localStorage.setItem("actionlist", JSON.stringify(e)), e.join(",") || ""
    }
 };