sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("odata.controller.S0", {
            onInit: function () {

                this._oData = {
                    ID: "",
                    Name: "",
                    Description: "",
                    Price: ""
                }

                this._listProduct = this.byId("listProducts")

                this._oModelDefault = this.getOwnerComponent().getModel("modelDefault")
                this._oModelControl = this.getOwnerComponent().getModel("modelControl")

            },

            onSearch: function (oEvent) {
                debugger
                this._oData.Name = this._oModelControl.getProperty("/valueSearchField")

                if (this._oData.Name == "") {
                    this._listProduct.getBinding("items").filter()
                } else {

                    var oFilter = new sap.ui.model.Filter({
                        path: "Name",
                        operator: sap.ui.model.FilterOperator.Contains,
                        value1: this._oData.Name
                    })

                    this._listProduct.getBinding("items").filter(oFilter)

                }

            },

            onItemPress: function (oEvent) {
                debugger

                this._oData.ID = oEvent.getParameters().listItem.getBindingContext("modelDefault").getProperty("ID")
                this._oData.Name = oEvent.getParameters().listItem.getBindingContext("modelDefault").getProperty("Name")
                this._oData.Description = oEvent.getParameters().listItem.getBindingContext("modelDefault").getProperty("Description")
                this._oData.Price = oEvent.getParameters().listItem.getBindingContext("modelDefault").getProperty("Price")

                this._oModelControl.setProperty("/valueInputID", this._oData.ID)
                this._oModelControl.setProperty("/valueInputName", this._oData.Name)
                this._oModelControl.setProperty("/valueInputDescription", this._oData.Description)
                this._oModelControl.setProperty("/valueInputPrice", this._oData.Price)
            },

            onCreateProducts: function (oEvent) {
                debugger
                var oParameters = {
                    success: this.onSuccessCreateProduct.bind(this),
                    error: this.onErrorCreateProduct.bind(this),
                }

                this._oData.ID = parseInt(this._oModelControl.getProperty("/valueInputID"))
                this._oData.Name = this._oModelControl.getProperty("/valueInputName")
                this._oData.Description = this._oModelControl.getProperty("/valueInputDescription")
                this._oData.Price = this._oModelControl.getProperty("/valueInputPrice")

                this._oModelControl.setProperty("/busyBar", true)
                this._oModelDefault.create("/Products", this._oData, oParameters)
            },

            onUpdateProducts: function (oEvent) {

                debugger
                var oParameters = {
                    success: this.onSuccessUpdateProduct.bind(this),
                    error: this.onErrorUpdateProduct.bind(this),
                }

                this._oData.ID = parseInt(this._oModelControl.getProperty("/valueInputID"))
                this._oData.Name = this._oModelControl.getProperty("/valueInputName")
                this._oData.Description = this._oModelControl.getProperty("/valueInputDescription")
                this._oData.Price = this._oModelControl.getProperty("/valueInputPrice")

                this._oModelControl.setProperty("/busyBar", true)

                //var sPath = "/Products(" + this._oData.ID + ")"
                var sPath = this._oModelDefault.createKey("/Products", {
                    ID: this._oData.ID
                })

                this._oModelDefault.update(sPath, this._oData, oParameters)

            },

            onDeleteProducts: function (oEvent) {
                debugger
                var oParameters = {
                    success: this.onSuccessDeleteProduct.bind(this),
                    error: this.onErrorDeleteProduct.bind(this),
                }

                var sPath = oEvent.getParameters().listItem.getBindingContext("modelDefault").getPath()
                this._oModelDefault.remove(sPath, oParameters)

            },

            onSuccessCreateProduct: function (oData, response) {
                debugger
                sap.m.MessageToast.show("Product created with success. ID: " + oData.ID, {
                    duration: 3000,                  // default
                    width: "15em",                   // default
                    my: "center bottom",             // default
                    at: "center bottom",             // default
                    of: window,                      // default
                    offset: "0 0",                   // default
                    collision: "fit fit",            // default
                    onClose: null,                   // default
                    autoClose: true,                 // default
                    animationTimingFunction: "ease", // default
                    animationDuration: 1000,         // default
                    closeOnBrowserNavigation: true   // default
                });
                this._oModelControl.setProperty("/busyBar", false)
                this._oModelDefault.refresh();
            },

            onSuccessUpdateProduct: function (oData, response) {
                debugger
                sap.m.MessageToast.show("Product updated", {
                    duration: 3000,                  // default
                    width: "15em",                   // default
                    my: "center bottom",             // default
                    at: "center bottom",             // default
                    of: window,                      // default
                    offset: "0 0",                   // default
                    collision: "fit fit",            // default
                    onClose: null,                   // default
                    autoClose: true,                 // default
                    animationTimingFunction: "ease", // default
                    animationDuration: 1000,         // default
                    closeOnBrowserNavigation: true   // default
                });
                this._oModelControl.setProperty("/busyBar", false)
                this._oModelDefault.refresh();
            },

            onSuccessDeleteProduct: function (oData, response) {
                debugger
                sap.m.MessageToast.show("Product Deleted", {
                    duration: 3000,                  // default
                    width: "15em",                   // default
                    my: "center bottom",             // default
                    at: "center bottom",             // default
                    of: window,                      // default
                    offset: "0 0",                   // default
                    collision: "fit fit",            // default
                    onClose: null,                   // default
                    autoClose: true,                 // default
                    animationTimingFunction: "ease", // default
                    animationDuration: 1000,         // default
                    closeOnBrowserNavigation: true   // default
                });

                this._oModelDefault.refresh();
            },

            onErrorUpdateProduct: function (response) {

            },


            onErrorCreateProduct: function (response) {
                debugger
                this._oModelControl.setProperty("/busyBar", false)
            },

            onErrorDeleteProduct: function (response) {

            }

        });
    });
