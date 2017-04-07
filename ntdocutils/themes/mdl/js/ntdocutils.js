// NtDocutils https://ntrrg.github.io/NtDocutils/
// Copyright 2017 Miguel Angel Rivera Notararigo
// Licensed under The MIT License. See LICENSE file for full licensing details.

window.addEventListener("load", function () {
    docinfo();
    OSFilter();
    options();
    links();
    noPrint();
});

function docinfo() {
    /***:js:`function docinfo()`.

    Replace bibliographic fields with Material Icons.
    ***/
    var fields = document.querySelectorAll(".docinfo dt");

    for(var i = 0; i < fields.length; ++i) {
        var field = fields[i];
        var icon;

        switch(field.className) {
            case "author":
                icon = "person";
            break;

            case "authors":
                icon = "people";
            break;

            case "organization":
                icon = "group_work";
            break;

            case "contact":
                icon = "email";
            break;

            case "address":
                icon = "place";
            break;

            case "version":
                icon = "code";
            break;

            case "status":
                icon = "show_chart";
            break;

            case "date":
                icon = "access_time";
            break;

            case "copyright":
                icon = "copyright";
            break;

            case "license":
                icon = "copyright";
            break;

            default:
                icon = "info";
            break;
        };

        var icon = elementCreate("i", {
            "class": "material-icons",
            "title": field.textContent,
            "textContent": icon
        });
        elementUpdate(field, {"innerHTML": ""});
        field.appendChild(icon);
    }
}

function links() {
    /***:js:`function links()`.

    Open external links in a new tab.
    ***/
    var links = document.querySelectorAll("a:not([href^='#'])");

    for(var i = 0; i < links.length; ++i) {
        var link = links[i];

        if(link.href)
            elementUpdate(link, {"target": "_blank"});
    }
}

function noPrint() {
    /***:js:`function noPrint()`.

    Remove :css:`@media print` from stylesheets.
    ***/
    var sheets = document.styleSheets;

    for(var i = 0; i < sheets.length; ++i) {
        var sheet = sheets[i];

        if(sheet.href)
            continue;

        var rules = (sheet.cssRules) ? sheet.cssRules : sheet.rules;

        for(var i2 = 0; i2 < rules.length; ++i2) {
            var rule = rules[i2];

            if(rule.cssText.search("@media print") >= 0)
                sheet.deleteRule(i2);
        }
    }
}

function options() {
    /***:js:`options()`.

    Setup options.
    ***/

    // Main button
    var optionsButton = document.querySelector("#options button:first-child");
    var optionsIcon = optionsButton.querySelector("i.material-icons");

    optionsButton.addEventListener("click", function () {
        var buttons = document.querySelectorAll("#options button:not(:first-child), #options a button");
        var icon;

        // Show buttons
        if(this.className.search("open") < 0) {
            for(var i = 0; i < buttons.length; ++i)
                elementUpdate(buttons[i], {"style": {"bottom": 115 * (i + 1) + "%"}});

            icon = "close";
        }

        // Hide buttons
        else {
            for(var i = 0; i < buttons.length; ++i)
                elementUpdate(buttons[i], {"style": {"bottom": "0px"}});

            icon = "more_vert";
        }

        classToggle(this, "open");
        elementUpdate(optionsIcon, {"textContent": icon});
    });

    // Theme toggler
    var themeButton = elementCreate("button", {
        "class": "mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--accent"
    });
    document.querySelector("#options").appendChild(themeButton);
    componentHandler.upgradeElement(themeButton);

    var icon = elementCreate("i", {
        "class": "material-icons",
        "textContent": "invert_colors"
    });
    themeButton.appendChild(icon);

    themeButton.addEventListener("click", function () {
        var container = document.querySelector(".mdl-layout");
        var message;

        if(container.className.search("theme-dark") < 0)
            message = "Dark theme is enabled";

        else
            message = "Dark theme is disabled";

        classToggle(container, "theme-dark");
        snackbar(message);
    });

    // Print button
    var printButton = document.querySelector("#options button.print");
    printButton.addEventListener("click", function () {
        print();
    });

    // Attachments
    var menu = document.querySelector("#options button.attachments ~ .mdl-menu__container ul.mdl-menu");

    if(window.ATTACHMENTS) {
        for(var i = 0; i < ATTACHMENTS.length; ++i) {
            var file = ATTACHMENTS[i];

            var link = elementCreate("a", {
                "href": file.url,
                "download": (file.name) ? file.name : ""
            });
            menu.appendChild(link);

            var li = elementCreate("li", {
                "class": "mdl-menu__item",
                "textContent": (file.name) ? file.name : file.url
            });
            link.appendChild(li);

            var icon;

            if(file.icon)
                icon = file.icon;

            else {
                switch(file.url.match(/\..+$/g)[0]) {
                    case ".pdf":
                        icon = "picture_as_pdf";
                    break;

                    case ".jpg":
                    case ".jpeg":
                    case ".png":
                    case ".svg":
                        icon = "image";
                    break;

                    default:
                        icon = "insert_drive_file";
                    break;
                }
            }

            var icon = elementCreate("i", {
                "class": "material-icons",
                "textContent": icon
            });
            li.appendChild(icon);
        }
    }

    // Delete button if no attachments given
    else
        elementDelete(document.querySelector("#attachments-button"));
}

function OSFilter() {
    /***:js:`OSFilter()`.

    Setup the OS filter.
    ***/
    var elements = document.querySelectorAll(".os");
    var osList = [];
    var re = /os\-[\w\-]+/g;  // OS name pattern

    // Create OS list
    for(var i = 0; i < elements.length; ++i) {
        var element = elements[i];
        var osElement = element.className.match(re).map(function (value) {
            // Delete ``os-`` from captured groups
            return value.substr(3);
        });

        // Set the first OS found as default
        if(i == 0)
            OSSelect(osElement[0]);

        for(var i2 = 0; i2 < osElement.length; ++i2) {
            var os = osElement[i2];

            if(osList.indexOf(os) < 0)
                osList.push(os);
        }
    }

    osList.sort();

    for(var i = 0; i < osList.length; ++i) {
        var os = osList[i];

        var button = elementCreate("button", {
            "class": "mdl-button mdl-js-button mdl-button--raised mdl-button--accent mdl-js-ripple-effect",
            "data-os": os,
            "textContent": os.toUpperCase()
        });
        document.querySelector("#os_selection").appendChild(button);
        button.addEventListener("click", function () {
            var os = this.dataset.os;

            OSSelect(os);
            snackbar("OS change to " + os.toUpperCase());
        });
        componentHandler.upgradeElement(button);
    }
}

function OSSelect(os) {
    /***:js:`OSSelect(os)`.

    :js:`os=<OS name>` (:js:`String`)
      OS/Distribution to show.

    Show the content of the given OS/distribution.

    .. code:: js
        :number-lines:

        OSSelect("debian");
    ***/
    var elements = document.querySelectorAll(".os:not(.os-" + os + ")");

    for(var i = 0; i < elements.length; ++i)
        classDelete(elements[i], "is-visible");

    elements = document.querySelectorAll(".os-" + os);

    for(var i = 0; i < elements.length; ++i)
        classAdd(elements[i], "is-visible");
}

function snackbar(message) {
    /***:js:`snackbar(message)`.

    :js:`message=<message>` (:js:`String`)
      Message to show.

    Show a message at screen bottom.

    .. code:: js
        :number-lines:

        snackbar("Hello world!");
    ***/
    var container = document.querySelector("#snackbar");
    var data = {"message": message};

    container.MaterialSnackbar.showSnackbar(data);
}

// Libs

function classAdd(element, classNames) {
    /***:js:`function classAdd(element, classNames)`.

    :js:`element=<HTML element>` (:js:`HTMLElement` or types based on it)
      Element where classes will be added.

    :js:`classNames=<class[ ...]>` (:js:`String`)
      Space separated classes to add.

    Add classes to an element.

    .. code:: js
        :number-lines:

        // <body><body>
        classAdd(document.body, "is-large-screen");
        // <body class="is-large-screen"><body>
    ***/
    var classNames = classNames.split(" ");
    var result = element.className;

    for(var i = 0; i < classNames.length; ++i) {
        var className = classNames[i];

        if(result.search(className) < 0)
            result += " " + className;
    }

    element.className = result;
}

function classDelete(element, classNames) {
    /***:js:`function classDelete(element, classNames)`.

    :js:`element=<HTML element>` (:js:`HTMLElement` or types based on it)
      Element where classes will be deleted.

    :js:`classNames=<class[ ...]>` (:js:`String`)
      Space separated classes to delete.

    Delete classes from an element.

    .. code:: js
        :number-lines:

        // <body class="is-large-screen"><body>
        classDelete(document.body, "is-large-screen");
        // <body><body>
    ***/
    var classNames = classNames.split(" ");
    var result = element.className;

    for(var i = 0; i < classNames.length; ++i) {
        var className = classNames[i];

        if(result.search(className) >= 0) {
            result = result.replace(new RegExp(className, "g"), "");
            result = result.replace(/ {2,}/g, " ");
            result = result.trim();
        }
    }

    element.className = result;
}

function classToggle(element, classNames) {
    /***:js:`function classToggle(element, classNames)`.

    :js:`element=<HTML element>` (:js:`HTMLElement` or types based on it)
      Element where classes will be toggled.

    :js:`classNames=<class[ ...]>` (:js:`String`)
      Space separated classes to toggle.

    Toggle classes from an element.

    .. code:: js
        :number-lines:

        // <body class="is-large-screen"><body>
        classToggle(document.body, "is-large-screen is-small-screen");
        // <body class="is-small-screen"><body>
    ***/
    var classNames = classNames.split(" ");

    for(var i = 0; i < classNames.length; ++i) {
        var className = classNames[i];

        if(element.className.search(className) < 0)
            classAdd(element, className);

        else
            classDelete(element, className);
    }
}

function elementCreate(type, attributes) {
    /***:js:`elementCreate(type, attributes)`.

    :js:`type=<element type>` (:js:`String`)
      Element type to create.

    :js:`attributes=<tag attributes>` (:js:`Object`)
      **Optional**. Attributes to add at the new element.

    Create a HTML element. The ``style`` attribute must be an object with the
    properties.

    :js:`return` (:js:`HTMLElement` or types based on it)
      Created element.

    .. code:: js
        :number-lines:

        var attributes = {
            "type": "text",
            "value": "Hello world!",
            "style": {"color": "green"}
        };

        document.body.appendChild(elementCreate("input", attributes));
    ***/
    var element = document.createElement(type);

    if(attributes)
        elementUpdate(element, attributes);

    return element;
}

function elementDelete(element) {
    /***:js:`elementDelete(element)`.

    :js:`element=<HTML element>` (:js:`HTMLElement` or types based on it)
      Element to delete.

    Delete a HTML element.

    .. code:: js
        :number-lines:

        // <div id="test">Test block</div>
        elementDelete(document.querySelector("#test"));
    ***/
    element.parentNode.removeChild(element);
}

function elementUpdate(element, attributes) {
    /***:js:`elementUpdate(element, attributes)`.

    :js:`element=<HTML element>` (:js:`HTMLElement` or types based on it)
      Element to update.

    :js:`attributes=<tag attributes>` (:js:`Object`)
      Attributes to add at the new element.

    Update a HTML element. The ``style`` attribute must be an object with the
    properties.

    .. code:: js
        :number-lines:

        var attributes = {
            "contenteditable": true,
            "style": {"backgroundColor": "red"}
        };
        elementUpdate(document.body, attributes);
    ***/
    for(attribute in attributes) {
        switch(attribute) {
            case "innerHTML":
            case "textContent":
                element[attribute] = attributes[attribute];
            break;

            case "style":
                for(subattr in attributes[attribute])
                    element[attribute][subattr] = attributes[attribute][subattr];
            break;

            default:
                element.setAttribute(attribute, attributes[attribute]);
            break;
        }
    }
}
