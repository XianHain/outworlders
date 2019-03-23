!function(i){void 0===Craft.FeedMe&&(Craft.FeedMe={}),Craft.FeedMe.LicenseForm=Craft.BaseElementIndex.extend({licenseKey:null,licenseKeyStatus:null,$headers:null,$views:null,$validLicenseHeader:null,$invalidLicenseHeader:null,$mismatchedLicenseHeader:null,$unknownLicenseHeader:null,$validLicenseView:null,$updateLicenseView:null,$unregisterLicenseForm:null,$updateLicenseForm:null,$transferLicenseForm:null,$unregisterLicenseSpinner:null,$updateLicenseSpinner:null,$transferLicenseSpinner:null,$licenseKeyLabel:null,$licenseKeyInput:null,$updateBtn:null,$clearBtn:null,$licenseKeyError:null,init:function(e){this.$headers=i(".reg-header"),this.$views=i(".reg-view"),this.$validLicenseHeader=i("#valid-license-header"),this.$invalidLicenseHeader=i("#invalid-license-header"),this.$mismatchedLicenseHeader=i("#mismatched-license-header"),this.$unknownLicenseHeader=i("#unknown-license-header"),this.$validLicenseView=i("#valid-license-view"),this.$updateLicenseView=i("#update-license-view"),this.$unregisterLicenseForm=i("#unregister-license-form"),this.$updateLicenseForm=i("#update-license-form"),this.$transferLicenseForm=i("#transfer-license-form"),this.$unregisterLicenseSpinner=i("#unregister-license-spinner"),this.$updateLicenseSpinner=i("#update-license-spinner"),this.$transferLicenseSpinner=i("#transfer-license-spinner"),this.$licenseKeyLabel=i("#license-key-label"),this.$licenseKeyInput=i("#license-key-input"),this.$updateBtn=i("#update-license-btn"),this.$clearBtn=i("#clear-license-btn"),this.$licenseKeyError=i("#license-key-error"),this.addListener(this.$unregisterLicenseForm,"submit","handleUnregisterLicenseFormSubmit"),this.addListener(this.$updateLicenseForm,"submit","handleUpdateLicenseFormSubmit"),this.addListener(this.$transferLicenseForm,"submit","handleTransferLicenseFormSubmit"),this.addListener(this.$licenseKeyInput,"focus","handleLicenseKeyFocus"),this.addListener(this.$licenseKeyInput,"textchange","handleLicenseKeyTextChange"),this.addListener(this.$clearBtn,"click","handleClearButtonClick"),e?this.loadLicenseInfo():(this.unloadLoadingUi(),this.setLicenseKey(null),this.setLicenseKeyStatus("unknown"))},unloadLoadingUi:function(){i("#loading-license-info").remove(),i("#license-view-hr").removeClass("hidden")},loadLicenseInfo:function(e){Craft.postActionRequest("feedMe/license/getLicenseInfo",i.proxy(function(e,s){"success"==s&&(e.success?(this.unloadLoadingUi(),this.setLicenseKey(e.licenseKey),this.setLicenseKeyStatus(e.licenseKeyStatus)):(i("#loading-graphic").addClass("error"),i("#loading-status").removeClass("light").text(Craft.t("Unable to load registration status at this time. Please try again later."))))},this))},setLicenseKey:function(e){this.licenseKey=this.normalizeLicenseKey(e);var s=this.formatLicenseKey(this.licenseKey);this.$licenseKeyLabel.text(s),this.$licenseKeyInput.val(s),this.handleLicenseKeyTextChange()},setLicenseKeyStatus:function(e){this.$headers.addClass("hidden"),this.$views.addClass("hidden"),this.licenseKeyStatus=e,this["$"+e+"LicenseHeader"].removeClass("hidden"),"valid"==this.licenseKeyStatus?this.$validLicenseView.removeClass("hidden"):(this.$updateLicenseView.removeClass("hidden"),this.$licenseKeyError.addClass("hidden"),"invalid"==this.licenseKeyStatus?this.$licenseKeyInput.addClass("error"):this.$licenseKeyInput.removeClass("error"),"mismatched"==this.licenseKeyStatus?this.$transferLicenseForm.removeClass("hidden"):this.$transferLicenseForm.addClass("hidden"))},normalizeLicenseKey:function(e){return e?e.toUpperCase().replace(/[^A-Z0-9]/g,""):""},formatLicenseKey:function(e){return e?e.match(/.{1,4}/g).join("-"):""},validateLicenseKey:function(e){return 24==e.length},handleUnregisterLicenseFormSubmit:function(e){e.preventDefault(),this.$unregisterLicenseSpinner.removeClass("hidden"),Craft.postActionRequest("feedMe/license/unregister",i.proxy(function(e,s){this.$unregisterLicenseSpinner.addClass("hidden"),"success"==s&&(e.success?(this.setLicenseKey(e.licenseKey),this.setLicenseKeyStatus("unknown")):Craft.cp.displayError(e.error))},this))},handleUpdateLicenseFormSubmit:function(e){e.preventDefault();var s=this.normalizeLicenseKey(this.$licenseKeyInput.val());if(!s||this.validateLicenseKey(s)){this.$updateLicenseSpinner.removeClass("hidden");var n={licenseKey:s};Craft.postActionRequest("feedMe/license/updateLicenseKey",n,i.proxy(function(e,s){this.$updateLicenseSpinner.addClass("hidden"),"success"==s&&(e.licenseKey?(this.setLicenseKey(e.licenseKey),this.setLicenseKeyStatus(e.licenseKeyStatus)):this.$licenseKeyError.removeClass("hidden").text(e.error||Craft.t("An unknown error occurred.")))},this))}},handleTransferLicenseFormSubmit:function(e){e.preventDefault(),this.$transferLicenseSpinner.removeClass("hidden"),Craft.postActionRequest("feedMe/license/transfer",i.proxy(function(e,s){this.$transferLicenseSpinner.addClass("hidden"),"success"==s&&(e.success?(this.setLicenseKey(e.licenseKey),this.setLicenseKeyStatus(e.licenseKeyStatus)):Craft.cp.displayError(e.error))},this))},handleLicenseKeyFocus:function(){this.$licenseKeyInput.get(0).setSelectionRange(0,this.$licenseKeyInput.val().length)},handleLicenseKeyTextChange:function(){this.$licenseKeyInput.removeClass("error");var e=this.normalizeLicenseKey(this.$licenseKeyInput.val());e?this.$clearBtn.removeClass("hidden"):this.$clearBtn.addClass("hidden"),e==this.licenseKey||e&&!this.validateLicenseKey(e)?this.$updateBtn.addClass("disabled"):this.$updateBtn.removeClass("disabled")},handleClearButtonClick:function(){this.$licenseKeyInput.val("").focus(),this.handleLicenseKeyTextChange()}})}(jQuery);