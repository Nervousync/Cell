/*
 * Licensed to the Nervousync Studio (NSYC) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/*
 *
 * 1.0.1
 * [New] Extend String for Verify CHN ID Card Code and CHN Social Credit Code
 *
 * 1.0.0
 * [New] Extend Element/String/Number/Array/Date
 *
 */
'use strict';
const Comment = {
    Version: "1.0.1",
    Language: navigator.language,
    Html5: ((typeof Worker) !== "undefined"),
    MaxWidth: Math.max(document.documentElement.scrollWidth, document.documentElement.clientWidth),
    MaxHeight: Math.max(document.documentElement.scrollHeight, document.documentElement.clientHeight),
    GPS: !!navigator.geolocation,
    TimeZoneOffset: new Date().getTimezoneOffset() * 60 * 1000,
    ISO8601DATEPattern: "yyyy-MM-dd",
    ISO8601TIMEPattern: "HH:mm:ss",
    ISO8601DATETIMEPattern: "yyyy-MM-ddTHH:mm:ss",
    BASE16: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'],
    BASE36: [
        '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
        'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'
    ],
    BASE64: [
        'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
        'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
        'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
        'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
        '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '/', '='
    ],
    MONTH: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    SocialCreditCode: [
        '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F',
        'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'T', 'U', 'W', 'X', 'Y'
    ],
    Browser: {
        Version: -1,
        //	Internet Explorer
        IE: !!window.ActiveXObject || "ActiveXObject" in window,
        //	Internet Explorer 11
        IE11: (!(navigator.userAgent.toUpperCase().indexOf('TRIDENT') > -1
            && navigator.userAgent.toUpperCase().indexOf('RV:') > -1)),
        //	Microsoft Edge
        Edge: navigator.userAgent.toUpperCase().indexOf('EDGE') > -1,
        //	Opera Explorer
        Opera: navigator.userAgent.toUpperCase().indexOf('OPERA') > -1,
        //	Firefox Explorer
        Firefox: navigator.userAgent.toUpperCase().indexOf('FIREFOX') > -1,
        // 	Apple Safari Explorer
        Safari: !!window.openDatabase && navigator.userAgent.toUpperCase().indexOf('SAFARI') > -1,
        //	Chrome Explorer
        Chrome: !!window.MessageEvent && navigator.userAgent.toUpperCase().indexOf('CHROME') > -1,
        //	Apple Safari and Google Chrome
        WebKit: navigator.userAgent.indexOf('AppleWebKit/') > -1,
        //	Mozilla Firefox, Apple Safari and Google Chrome
        Gecko: navigator.userAgent.indexOf('Gecko') > -1 && navigator.userAgent.indexOf('KHTML') === -1,
        //  QQBrowser
        QQBrowser: /QQBROWSER/.test(navigator.userAgent.toUpperCase()),
        //  WeiXinBrowser
        WXBrowser: /MICROMESSENGER/i.test(navigator.userAgent.toUpperCase())
    },
    Author: [
        {"Name": "Steven Wee", "EMail": "wmkm0113@gmail.com", "ORG": "Nervousync Studio"}
    ]
};
Object.freeze(Comment);
Comment.Browser.Version = () => {
    let userAgent = navigator.userAgent.toUpperCase();
    if (Comment.Browser.IE) {
        return parseInt(userAgent.match(/(MSIE\s|TRIDENT.*RV:)([\w.]+)/)[2]);
    } else if (Comment.Browser.IE11) {
        let version = parseInt(userAgent.match(/(MSIE\s|TRIDENT.*RV:)([\w.]+)/)[2]);
        if (version !== 11) {
            Comment.Browser.IE = true;
            Comment.Browser.IE11 = false;
        }
        return version;
    } else if (Comment.Browser.Chrome) {
        return parseInt(userAgent.match(/CHROME\/([\d.]+)/)[1]);
    } else if (Comment.Browser.Firefox) {
        return parseInt(userAgent.match(/FIREFOX\/([\d.]+)/)[1]);
    } else if (Comment.Browser.Opera) {
        return parseInt(userAgent.match(/OPERA\/([\d.]+)/)[1]);
    } else if (Comment.Browser.Safari) {
        return parseInt(userAgent.match(/VERSION\/([\d.]+)/)[1]);
    } else if (Comment.Browser.Edge) {
        return parseInt(userAgent.match(/EDGE\/([\d.]+)/)[1]);
    } else if (Comment.Browser.QQBrowser) {
        return parseInt(userAgent.match(/QQBROWSER\/([\d.]+)/)[1]);
    } else if (Comment.Browser.WXBrowser) {
        return parseInt(userAgent.match(/MICROMESSENGER\/([\d.]+)/)[1]);
    }
}
const TagDefine = {
    HtmlTag: [
        "a", "abbr", "acronym", "address", "applet", "area", "b", "base", "bdo", "big", "blockquote", "body", "br",
        "button", "caption", "center", "cite", "code", "col", "colgroup", "dd", "del", "div", "dfn", "dl", "dt", "em",
        "embed", "fieldset", "form", "frame", "frameset", "h1", "h2", "h3", "h4", "h5", "h6", "head", "html", "i",
        "iframe", "img", "input", "ins", "kbd", "label", "legend", "li", "link", "map", "meta", "noframes", "noscript",
        "object", "ol", "optgroup", "option", "p", "param", "pre", "q", "s", "samp", "script", "select", "small",
        "span", "strong", "style", "sub", "sup", "table", "tbody", "td", "textarea", "tfoot", "th", "thead", "title",
        "tr", "tt", "ul", "var"
    ],
    Html5Tag: [
        "a", "abbr", "address", "area", "article", "aside", "audio", "b", "base", "bdi", "bdo", "big", "blockquote",
        "body", "br", "button", "canvas", "caption", "center", "cite", "code", "col", "colgroup", "data", "datalist",
        "dd", "del", "details", "div", "dfn", "dialog", "dl", "dt", "em", "embed", "fieldset", "figcaption", "figure",
        "footer", "form", "frame", "frameset", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "html",
        "i", "iframe", "img", "input", "ins", "kbd", "keygen", "label", "legend", "li", "link", "main", "map", "mark",
        "meta", "meter", "nav", "noframes", "noscript", "object", "ol", "optgroup", "option", "output", "p", "param",
        "picture", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "script", "section", "select", "small",
        "source", "span", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "textarea", "template",
        "tfoot", "th", "thead", "time", "title", "tr", "track", "tt", "ul", "var", "video", "wbr"
    ]
}
Object.seal(TagDefine);
const RegexLibrary = {
    E_Mail: /^([A-Za-z\d_\-.])+@([A-Za-z\d_\-.])+\.([A-Za-z]{2,4})$/i,
    UUID: /^([\da-f]{8}((-[\da-f]{4}){3})-[\da-f]{12})|([\da-f]{32})\b/g,
    BlankText: /\s+/ig,
    Number: /^\b\d+\b$/g,
    Zero_Number: /^-?0*$/g,
    Color: /^#[\dA-F]{6}$/i,
    XML: /<[a-zA-Z\d]+[^>]*>(?:.|[\r\n])*?<\/[a-zA-Z\d]+>/ig,
    HtmlTag: /<[a-zA-Z\d]+[^>]*>/ig,
    Luhn: /^[0-9]+/g,
    CHN_ID_Card: /^[1-9](\d{17}|(\d{16}X))$/g,
    CHN_Social_Credit: /^([1-9]|A|N|Y)[\dA-Z]{17}$/g
};
const DarkMode = {
    Light: 0,
    Dark: 1,
    Sun: 2,
    System: 3
}
Object.freeze(DarkMode);
const DebugMode = {
    DEBUG: 0,
    INFO: 1,
    WARN: 2,
    ERROR: 3
}
Object.freeze(DebugMode);
const SlideType = {
    ScrollLeft: 0,
    ScrollTop: 1,
    ScrollRight: 2,
    ScrollBottom: 3,
    ZoomIn: 4,
    ZoomOut: 5,
    OpacityIn: 6,
    OpacityOut: 7
}
Object.freeze(SlideType);
const Config = {
    contextPath: "",
    componentPath: "",
    multiPath: "/scripts/multi/{languageCode}.json",
    languageCode: Comment.Language,
    debugMode: DebugMode.INFO,
    notify: {
        dataPath: "",
        period: 15 * 1000
    },
    scrollHeader: {
        enabled: false,
        selectors: [],
        styleClass: "fixed"
    },
    //  Config the dark mode by sunrise and sunset
    darkMode: {
        mode: DarkMode.Light,
        styleClass: "darkMode"
    },
    //  Config for form data
    formConfig: {
        //  Convert date/time from 'yyyy-MM-dd [HH:mm]' to number of milliseconds between that date and midnight, January 1, 1970.
        convertDateTime: false,
        //  Convert value is UTC number of milliseconds between that date and midnight, January 1, 1970.
        utcDateTime: false
    },
    security: {
        providers: [],
        password: {
            //  Encrypt value of input[type='password']
            encrypt: true,
            //  Digest method for input[type='password']
            //  Options:    MD5(*)/SHA1(*)/CRC/SHA224/SHA256/SHA384/SHA512/SHA512_224/SHA512_256
            //              SHA3_224/SHA3_256/SHA3_384/SHA3_512/SHAKE128/SHAKE256
            //              Keccak224/Keccak256/Keccak384/Keccak512
            //  *: Low security level, just using for compatible old system
            digest: "SHA256"
        },
        //  RSA Key Config
        RSA: {
            exponent: "",
            modulus: "",
            //  Exponent and modulus data radix, default is 16
            radix: 16,
            //  Public Key Size
            keySize: 1024,
            padding: "NoPadding"
        }
    },
    elements: []
};
Object.seal(Config);

function $() {
    if (arguments.length <= 0) {
        return [];
    } else {
        let argCount = arguments.length;
        if (argCount === 1) {
            return document.getElementById(arguments[0]);
        } else {
            let returnElements = [];
            for (let i = 0; i < argCount; i++) {
                let element = null;
                let elementId = arguments[i];
                if (typeof elementId === 'string') {
                    element = document.getElementById(elementId);
                }
                returnElements.push(element);
            }
            return returnElements;
        }
    }
}

export {Comment, RegexLibrary, Config, DarkMode, DebugMode, SlideType, $};
Object.assign(Element.prototype, {
    getClass() {
        let _className;
        if (Comment.Browser.IE && !Comment.Browser.IE11) {
            _className = this.getAttribute("className");
        } else {
            _className = this.getAttribute("class");
        }
        if (_className == null) {
            _className = "";
        }
        return _className;
    },
    hasClass(_className = "") {
        if (_className.length === 0) {
            return true;
        }
        if (Comment.Html5) {
            return this.classList.contains(_className);
        }
        if (_className) {
            return this.getClass().indexOf(_className) !== -1;
        }
        return false;
    },
    appendClass(_className = "") {
        if (_className.length > 0) {
            if (Comment.Html5) {
                this.classList.add(_className);
            } else {
                if (_className && !this.hasClass(_className)) {
                    this.setClass(this.getClass() + " " + _className);
                }
            }
        }
    },
    removeClass(_className = "") {
        if (_className.length > 0) {
            if (Comment.Html5) {
                this.classList.remove(_className);
            } else {
                if (_className && this.hasClass(_className)) {
                    this.setClass(this.getClass().replace(_className, ""));
                }
            }
        }
    },
    setClass(_className = "") {
        if (_className.length > 0) {
            this.setAttribute("class", _className.replace(RegexLibrary.BlankText, " ").trim());
        } else {
            this.removeAttribute("class");
        }
    },
    setStyle(_cssText = "") {
        if (_cssText.length > 0) {
            this.setAttribute("style", this.getStyle() + _cssText);
        }
    },
    getStyle() {
        return this.hasAttribute("style") ? this.getAttribute("style") : "";
    },
    bindEvent(_eventName, _operateFunc) {
        this.removeEvent(_eventName, _operateFunc);
        this.addEventListener(_eventName, _operateFunc, false);
    },
    scrollOut() {
        if (this.dataset.hasOwnProperty("offsetTop")) {
            let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            return scrollTop > this.dataset.offsetTop;
        }
        return false;
    },
    scrollInView() {
        return this.getBoundingClientRect().top >= 0;
    },
    inViewPort() {
        let viewPortHeight = window.innerHeight || document.documentElement.clientHeight;
        let viewPortWidth = window.innerWidth || document.documentElement.clientWidth;
        let {top, left, bottom, right} = this.getBoundingClientRect();
        return (top >= 0 && left >= 0 && bottom <= viewPortHeight && right <= viewPortWidth);
    },
    removeEvent(_eventName, _operateFunc) {
        this.removeEventListener(_eventName, _operateFunc, false);
    },
    clearChildNodes() {
        let _childCount = this.childNodes.length;
        while (_childCount > 0) {
            this.removeChild(this.childNodes[0]);
            _childCount--;
        }
    },
    hide() {
        this.appendClass("hidden");
    },
    show() {
        this.removeClass("hidden");
    },
    disable() {
        this.setAttribute("disabled", "true");
        this.dataset.disabled = "true";
        if (this.tagName.toLowerCase() === "html" || this.tagName.toLowerCase() === "body") {
            document.body.style.overflow = "hidden";
        }
    },
    enable() {
        this.removeAttribute("disabled");
        this.dataset.disabled = "false";
        if (this.tagName.toLowerCase() === "html" || this.tagName.toLowerCase() === "body") {
            document.body.style.overflow = "auto";
        }
    },
    formData() {
        let formData = {};
        if (this.tagName.toLowerCase() === "form") {
            formData.uploadFile = false;
            let _formData = new FormData();
            let _inputName, _inputValue;
            this.querySelectorAll("input, select, textarea").forEach(input => {
                _inputName = input.name;
                let process = true;
                if (input.type === "checkbox" || input.type === "radio") {
                    process = input.checked;
                }
                if (process) {
                    _inputValue = input.value;
                    if (_inputValue !== null && _inputValue.length > 0) {
                        if (input.tagName.toLowerCase() === "input") {
                            switch (input.type.toLowerCase()) {
                                case "password":
                                    _inputValue = Cell.digest(_inputValue);
                                    break;
                                case "date":
                                case "time":
                                case "datetime-local":
                                    _inputValue = Cell.dateToMilliseconds(_inputValue);
                                    break;
                                case "file":
                                    formData.uploadFile = true;
                                    break;
                                case "text":
                                case "search":
                                case "url":
                                    if (input.dataset.encrypt === "true") {
                                        _inputValue = Cell.encData(_inputValue);
                                    }
                                    break;
                            }
                        } else if (input.tagName.toLowerCase() !== "select") {
                            _inputValue = _inputValue.encodeByRegExp();
                        }
                        _formData.append(_inputName, _inputValue);
                    }
                }
            });
            this.querySelectorAll("drag-upload").forEach(drawUpload =>
                drawUpload.uploadFiles().forEach(fileItem => {
                    _formData.append(drawUpload.getAttribute("name"), fileItem, fileItem.name);
                    formData.uploadFile = true;
                }));
            if (formData.uploadFile && this.dataset.uploadProgress) {
                formData.uploadProgress = this.dataset.uploadProgress;
            }
            formData.data = _formData;
        }
        return formData;
    },
    validate() {
        let _result = true;
        let _tagName = this.tagName.toLowerCase();
        if (_tagName === "form") {
            this.querySelectorAll("input, select, textarea")
                .forEach(input => {
                    _result = _result && input.validate();
                });
        } else if (this.dataset.validate === "true" && ["input", "select", "textarea"].indexOf(_tagName) !== -1) {
            if (this.value.length > 0) {
                let _value = this.value;
                if (this.dataset.regex) {
                    _result = _result && (_value.match(this.dataset.regex) !== null);
                }
                if (this.dataset.minValue && this.dataset.minValue.isNum()) {
                    _result = _result && _value.isNum() && (this.dataset.minValue.parseFloat() <= _value.parseFloat());
                }
                if (this.dataset.maxValue && this.dataset.maxValue.isNum()) {
                    _result = _result && _value.isNum() && (_value.parseFloat() <= this.dataset.maxValue.parseFloat());
                }
                if (this.dataset.xml === "true") {
                    _result = _result && _value.isXml();
                }
                if (this.dataset.html === "true") {
                    _result = _result && _value.isHtml();
                }
                if (this.dataset.email === "true") {
                    _result = _result && _value.isEmail();
                }
                if (this.dataset.luhn === "true") {
                    _result = _result && _value.isLuhn();
                }
                if (this.dataset.color === "true") {
                    _result = _result && _value.isColorCode();
                }
                if (this.dataset.CHNID === "true") {
                    _result = _result && _value.isCHNID();
                }
                if (this.dataset.CHNSocialCredit === "true") {
                    _result = _result && _value.isCHNSocialCredit();
                }
            } else {
                _result = (this.dataset.notNull === undefined || this.dataset.notNull === "false");
            }
        }
        return _result;
    },
    sortChildrenBy(selectors = "", attributeName = "", _sortDesc = false) {
        if (!attributeName || !selectors) {
            return;
        }
        if (this.hasChildNodes()) {
            let queryNodes = this.querySelectorAll(selectors);
            let sortNodes = Array.from(queryNodes)
                .sort((a, b) => {
                    try {
                        let aValue = a.getAttribute(attributeName);
                        let bValue = b.getAttribute(attributeName);
                        if (bValue.length !== aValue.length) {
                            return _sortDesc ? bValue.length > aValue.length : bValue.length < aValue.length;
                        }
                        return _sortDesc ? bValue.localeCompare(aValue) : aValue.localeCompare(bValue);
                    } catch (e) {
                        return 0;
                    }
                });
            Array.from(queryNodes).forEach(childNode => this.removeChild(childNode));
            Array.from(sortNodes).forEach(childNode => this.appendChild(childNode));
        }
    },
    attrNames() {
        if (Comment.Browser.IE || Comment.Browser.IE11) {
            let _attrNames = [], _attrList = this.attributes, _length = _attrList.length, i;
            for (i = 0; i < _length; i++) {
                _attrNames.push(_attrList[i].name);
            }
            return _attrNames;
        } else {
            return this.getAttributeNames();
        }
    },
    childList() {
        if (Comment.Browser.IE || Comment.Browser.IE11) {
            let _children = [], _nodeList = this.childNodes, _length = _nodeList.length, i;
            for (i = 0; i < _length; i++) {
                if (_nodeList[i].nodeType === 1) {
                    _children.push(_nodeList[i]);
                }
            }
            return _children;
        } else {
            return this.children;
        }
    },
    render() {
        if (Comment.Browser.IE || Comment.Browser.IE11) {
            let _html = "<" + this.tagName;
            let _attributes = this.attributes, _attrLength = _attributes.length, i;
            for (i = 0; i < _attrLength; i++) {
                _html += (" " + _attributes[i].name + "=\"" + this.getAttribute(_attributes[i].name) + "\"");
            }
            if (this.tagName.toLowerCase() === "input") {
                _html += "/>";
            } else {
                _html += ">";
                let _childList = this.childList(), _childLength = _childList.length;
                if (_childLength > 0) {
                    for (i = 0; i < _childLength; i++) {
                        _html += _childList[i].render();
                    }
                } else if (this.innerHTML !== undefined) {
                    _html += this.innerHTML;
                }
                _html += ("</" + this.tagName + ">");
            }
            return _html;
        } else {
            return this.outerHTML;
        }
    }
});
Object.assign(String.prototype, {
    reverse() {
        return Array.from(this).reverse().join('');
    },
    cleanBlank() {
        return this.isEmpty() ? "" : this.replace(RegexLibrary.BlankText, "");
    },
    isEmpty() {
        return this === "" || this.trim() === "";
    },
    isEmail() {
        return RegexLibrary.E_Mail.test(this.cleanBlank());
    },
    isLuhn() {
        if (this.trim().search(RegexLibrary.Luhn) !== -1) {
            let _numArray = this.trim().split('').reverse();
            let _result = 0;
            for (let _index = 0; _index < _numArray.length; _index++) {
                let _current = _numArray[_index].parseInt();
                if (_index % 2) {
                    _current *= 2;
                    if (_current > 9) {
                        _current -= 9;
                    }
                }
                _result += _current;
            }
            return (_result % 10) === 0;
        }
        return false;
    },
    isCHNID() {
        if (this.trim().search(RegexLibrary.CHN_ID_Card) !== -1) {
            let _sigma = 0, _code, i;
            for (i = 0; i < 17; i++) {
                _code = this.charAt(i).parseInt();
                if (_code !== 0) {
                    _sigma += _code * (Math.pow(2, 17 - i) % 11);
                }
            }
            let _authCode = (12 - (_sigma % 11)) % 11;
            return (_authCode === 10) ? this.toUpperCase().endsWith("X") : (this.charAt(17).parseInt() === _authCode);
        }
        return false;
    },
    isCHNSocialCredit() {
        if (this.trim().search(RegexLibrary.CHN_Social_Credit) !== -1) {
            let _sigma = 0, _validateCode = Comment.SocialCreditCode.indexOf(this.charAt(17)), _code, i;
            for (i = 0; i < 17; i++) {
                _code = Comment.SocialCreditCode.indexOf(this.charAt(i));
                if (_code !== 0) {
                    _sigma += _code * (Math.pow(3, i) % 31);
                }
            }
            let _authCode = 31 - (_sigma % 31);
            return (_authCode === 31) ? (_validateCode === 0) : (_authCode === _validateCode);
        }
        return false;
    },
    isJSON() {
        try {
            let obj = JSON.parse(this);
            return (typeof obj) === "object" && obj;
        } catch (e) {
            return false;
        }
    },
    isColorCode() {
        return this.trim().search(RegexLibrary.Color) !== -1;
    },
    isXml() {
        return this.trim().search(RegexLibrary.XML) !== -1;
    },
    isHtml() {
        let _matchResult = this.isXml();
        if (_matchResult) {
            let _length = RegexLibrary.HtmlTag.length, _tagName;
            for (let i = 0; i < _length; i++) {
                _tagName = this.match(RegexLibrary.HtmlTag[i]);
                if (_tagName !== null) {
                    _tagName = _tagName.substring(1, _tagName.length - 1);
                    if (_tagName.indexOf(" ") > 0) {
                        _tagName = _tagName.substring(0, _tagName.indexOf(" "));
                    }

                    _matchResult = Comment.Html5
                        ? TagDefine.Html5Tag.indexOf(_tagName) !== -1
                        : TagDefine.HtmlTag.indexOf(_tagName) !== -1;
                }
            }
        }
        return _matchResult;
    },
    parseJSON() {
        if (!this.isJSON()) {
            throw new Error("Data invalid");
        }
        if (typeof JSON !== 'undefined') {
            return JSON.parse(this);
        }

        if (Comment.Browser.Gecko) {
            return new Function("return " + this)();
        }

        return eval('(' + this + ')');
    },
    parseXml() {
        let _xmlDoc = null;
        if (Comment.Browser.IE && !Comment.Browser.IE11) {
            ["MSXML.2.DOMDocument.6.0", "MSXML.2.DOMDocument.3.0", "Microsoft.XMLDOM"]
                .forEach(_xmlDomVersion => {
                    if (_xmlDoc == null) {
                        try {
                            _xmlDoc = new ActiveXObject(_xmlDomVersion);
                            _xmlDoc.async = false;
                            if (!_xmlDoc.loadXML(this)) {
                                _xmlDoc = null;
                            }
                        } catch (e) {
                            _xmlDoc = null;
                            console.log("XML data invalid" + e);
                        }
                    }
                });
        } else {
            try {
                _xmlDoc = new DOMParser().parseFromString(this, "text/xml");
            } catch (e) {
                console.log("XML data invalid" + e);
            }
        }

        return _xmlDoc == null ? null : _xmlDoc.documentElement;
    },
    isNum() {
        return (this.match(RegexLibrary.Number) != null);
    },
    parseInt(radix) {
        return parseInt(this, radix === null ? 10 : radix);
    },
    parseFloat() {
        return parseFloat(this);
    },
    setTitle() {
        document.title = this;
    },
    setKeywords() {
        let metaElement = document.head.querySelector("meta[name='keywords']");
        if (metaElement === null) {
            metaElement = document.createElement("meta");
            metaElement.setAttribute("name", "keywords");
            document.head.appendChild(metaElement);
        }
        metaElement.setAttribute("content", this);
    },
    setDescription() {
        let metaElement = document.head.querySelector("meta[name='description']");
        if (metaElement === null) {
            metaElement = document.createElement("meta");
            metaElement.setAttribute("name", "description");
            document.head.appendChild(metaElement);
        }
        metaElement.setAttribute("content", this);
    },
    encodeBase64() {
        return this.toByteArray().encodeBase64();
    },
    decodeBase64() {
        let _result = [], i = 0, _length = this.length;
        while (i < _length) {
            _result.push((Comment.BASE64.indexOf(this.charAt(i)) << 2) | (Comment.BASE64.indexOf(this.charAt(i + 1)) >> 4));
            let _code = Comment.BASE64.indexOf(this.charAt(i + 2));
            if (_code !== 64) {
                _result.push(((Comment.BASE64.indexOf(this.charAt(i + 1)) & 0xF) << 4) | (Comment.BASE64.indexOf(this.charAt(i + 2)) >> 2));
            }
            _code = Comment.BASE64.indexOf(this.charAt(i + 2));
            if (_code !== 64) {
                _result.push(((Comment.BASE64.indexOf(this.charAt(i + 2)) & 0x3) << 6) | Comment.BASE64.indexOf(this.charAt(i + 3)));
            }
            i += 4;
        }
        return _result;
    },
    encodeByRegExp() {
        let _result = "";
        if (this.length > 0) {
            _result = this.replace(/&/g, "&amp;")
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;")
                .replace(/ /g, "&nbsp;")
                .replace(/'/g, "&#39;")
                .replace(/"/g, "&quot;");
        }
        return _result;
    },
    decodeByRegExp() {
        let _result = "";
        if (this.length > 0) {
            _result = this.replace(/&quot;/g, "\"")
                .replace(/&#39;/g, "\'")
                .replace(/&nbsp;/g, " ")
                .replace(/&lt;/g, "<")
                .replace(/&gt;/g, ">")
                .replace(/&amp;/g, "&");
        }
        return _result;
    },
    toUTF8: function () {
        return /[\u0080-\uFFFF]/.test(this) ? decodeURI(encodeURIComponent(this)) : this;
    },
    toByteArray(bigEndian = false) {
        let _array = this.split(''), _length = _array.length, _result = [], _tmp, i, j;
        for (i = 0; i < _length; i++) {
            _tmp = encodeURI(_array[i]);
            if (_tmp.length === 1) {
                _result.push(_tmp.charCodeAt(0));
            } else {
                _tmp = _tmp.split('%');
                let _itemLen = _tmp.length;
                for (j = 0; j < _itemLen; j++) {
                    if (_tmp[j].length > 0) {
                        _result.push(parseInt('0x' + _tmp[j]));
                    }
                }
            }
        }
        if (bigEndian) {
            let _convResult = [];
            for (let position = 0; position < _result.length; position += 4) {
                _convResult[position + 3] = _result[position];
                _convResult[position + 2] = ((position + 1) < _result.length) ? _result[position + 1] : 0;
                _convResult[position + 1] = ((position + 2) < _result.length) ? _result[position + 2] : 0;
                _convResult[position] = ((position + 3) < _result.length) ? _result[position + 3] : 0;
            }
            return _convResult;
        }
        return _result;
    },
    getBytes() {
        let encode = encodeURIComponent(this);
        let _dataBytes = [];
        for (let _i = 0; _i < encode.length; _i++) {
            let ch = encode.charAt(_i);
            if (ch === '%') {
                _dataBytes.push(parseInt(encode.charAt(_i + 1) + encode.charAt(_i + 2), 16));
                _i += 2;
            } else {
                _dataBytes.push(ch.charCodeAt(0));
            }
        }
        return _dataBytes.reverse();
    }
});
Object.assign(HTMLVideoElement.prototype, {
    isPlaying() {
        return this.currentTime > 0 && !this.paused && !this.ended && this.readyState > HTMLMediaElement.HAVE_CURRENT_DATA;
    }
});
Object.assign(Number.prototype, {
    parseTime(utc = false) {
        let _date = new Date();
        if (utc) {
            _date.setTime(this - Comment.TimeZoneOffset);
        } else {
            _date.setTime(this);
        }
        return _date;
    },
    safeRotateLeft(_count) {
        return (this << _count) | (this >>> (32 - _count));
    },
    safeRotateRight(_count) {
        return (this >>> _count) | (this << (32 - _count));
    },
    rotateRight(_count) {
        return this >>> _count;
    }
});
Object.assign(Date.prototype, {
    format(pattern = "MM/dd/yyyy") {
        let Pattern = {
            "y+": this.getFullYear(),
            "M+": this.getMonth() + 1,
            "d+": this.getDate(),
            "H+": this.getHours(),
            "m+": this.getMinutes(),
            "s+": this.getSeconds(),
            "S+": this.getMilliseconds(),
            "q+": Math.floor((this.getMonth() + 3) / 3)
        };
        let returnValue = pattern;
        for (let regex in Pattern) {
            let matchResult = pattern.match(regex);
            if (matchResult !== null) {
                let matchKey = matchResult[0];
                let replaceValue;
                if (matchKey === "MMM") {
                    replaceValue = Comment.MONTH[Pattern[regex] - 1];
                } else {
                    replaceValue = "" + Pattern[regex];
                    if (matchKey.length < replaceValue.length) {
                        replaceValue = replaceValue.substring(replaceValue.length - matchKey.length);
                    } else {
                        while (replaceValue.length < matchKey.length) {
                            replaceValue = ("0" + replaceValue);
                        }
                    }
                }
                returnValue = returnValue.replace(matchKey, replaceValue);
            }
        }
        return returnValue;
    },
    /**
     * Calculate sunrise/sunset/noon by given gps location
     * @param posLon    GPS longitude
     * @param posLat    GPS latitude
     * @return Sun      Sun.Polar:  "Night" for Polar Night, SunRise: -1, SunSet: -1, Noon: -1
     *                              "Day" for Polar Day,     SunRise: -1, SunSet: -1, Noon: 12:00
     *                              "Normal" for Calculate,  SunRise: sunrise UTC time,
     *                                                       SunSet: sunset UTC time,
     *                                                       Noon: noon UTC time,
     *                                                       data unit: milliseconds
     */
    sunTime(posLon, posLat) {
        if (posLon === null || posLon < -180 || posLon > 180
            || posLat === null || posLat < -90 || posLat > 90) {
            throw new Error("GPS location unknown");
        }
        let _fixTime = Math.floor(Math.abs(posLon) / 15) * 60 * 60 * 1000;
        if (Math.abs(posLon) % 15 > 7.5) {
            _fixTime += 60 * 60 * 1000;
        }
        if (posLon < 0) {
            _fixTime *= -1;
        }
        let _currentUTC = new Date().getTime() + Comment.TimeZoneOffset,
            _gpsTime = new Date(_currentUTC + _fixTime),
            _gpsMonth = _gpsTime.getMonth() + 1, _gpsDay = _gpsTime.getDate(),
            RD = 180 / Math.PI, B5 = Math.PI * posLat / 180,
            N = (275 * _gpsMonth / 9) - 2 * ((_gpsMonth + 9) / 12) + _gpsDay - 30,
            L0 = 4.8771 + 0.0172 * (N + 0.5 - posLon / 360), C = 0.03342 * Math.sin(L0 + 1.345),
            C2 = RD * (Math.atan(Math.tan(L0 + C)) - Math.atan(0.9175 * Math.tan(L0 + C)) - C),
            SD = 0.3978 * Math.sin(L0 + C), CD = Math.sqrt(1 - SD * SD),
            SC = (SD * Math.sin(B5) + 0.0145) / (Math.cos(B5) * CD);
        let Sun = {};
        let UTC;
        if (SC < -1) {
            //  Polar Night
            Sun.Polar = "Night";
            Sun.SunRise = -1;
            Sun.SunSet = -1;
            Sun.Noon = -1;
        } else if (SC > 1) {
            //  Polar Day
            Sun.Polar = "Day";
            Sun.SunRise = -1;
            Sun.SunSet = -1;
            UTC = new Date(_currentUTC);
            UTC.setHours(12);
            UTC.setMinutes(0);
            Sun.Noon = UTC.getTime();
        } else {
            Sun.Polar = "Normal";
            let C3 = RD * Math.atan(SC / Math.sqrt(1 - Math.pow(SC, 2))), R1 = 6 - (posLon + C2 + C3) / 15,
                HR = Math.floor(R1), MR = Math.floor((R1 - HR) * 60);
            UTC = new Date(_currentUTC);
            UTC.setHours(HR);
            UTC.setMinutes(MR);
            Sun.SunRise = UTC.getTime();
            let S1 = 18 - (posLon + C2 - C3) / 15,
                HS = Math.floor(S1), MS = Math.floor((S1 - HS) * 60);
            UTC = new Date(_currentUTC);
            UTC.setHours(HS);
            UTC.setMinutes(MS);
            Sun.SunSet = UTC.getTime();
            Sun.Noon = Math.floor((Sun.SunRise + Sun.SunSet) / 2);
        }
        return Sun;
    }
});
Object.assign(Array.prototype, {
    toHex(littleEndian = true) {
        let _result = "", _byte;
        for (let i = 0; i < this.length; i++) {
            _byte = this[i];
            for (let j = 0; j < 4; j++) {
                if (littleEndian) {
                    _result += Comment.BASE16[(_byte >> ((2 * j + 1) * 4)) & 0x0F]
                        + Comment.BASE16[(_byte >> ((2 * j) * 4)) & 0x0F];
                } else {
                    _result += Comment.BASE16[(_byte >> (28 - ((2 * j) * 4))) & 0x0F]
                        + Comment.BASE16[(_byte >> (28 - ((2 * j + 1) * 4))) & 0x0F];
                }
            }
        }
        return _result;
    },
    encodeBase64(padding = "") {
        let _result = "", _length = this.length, i;
        for (i = 0; i < _length; i += 3) {
            _result += (Comment.BASE64[this[i] >> 2] + Comment.BASE64[((this[i] & 0x3) << 4) | (this[i + 1] >> 4)]);
            if (i + 1 < _length) {
                _result += Comment.BASE64[((this[i + 1] & 0xF) << 2) | (this[i + 2] >> 6)];
            }
            if (i + 2 < _length) {
                _result += Comment.BASE64[this[i + 2] & 0x3F];
            }
        }
        while (_result.length % 4 !== 0) {
            _result += ((padding.length === 0) ? Comment.BASE64[64] : padding);
        }
        return _result;
    }
});