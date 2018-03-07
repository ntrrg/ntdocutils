// NtDocutils https://ntrrg.github.io/NtDocutils/
// Copyright 2017 Miguel Angel Rivera Notararigo
// This file follows the Standart Style Guide (https://standardjs.com/)

'use strict'

window.addEventListener('load', () => {
  if (window.ATTACHMENTS === undefined) {
    window.ATTACHMENTS = []
  }

  removeMediaPrint()
  bFieldsToIcons()
  setupFilters()
  setupArticleOptions()
  setupExternalLinks()
})

const ICONS = new Map([
  ['author', 'person'],
  ['authors', 'people'],
  ['organization', 'group_work'],
  ['contact', 'email'],
  ['address', 'place'],
  ['version', 'code'],
  ['status', 'show_chart'],
  ['date', 'access_time'],
  ['copyright', 'copyright'],
  ['license', 'copyright']
])

/**
 * Adds classes to an element.
 *
 * @param {HTMLElement} element - Element where classes will be added.
 * @param {String} classNames - Space separated classes to add.
 *
 * @example
 *
 * // <body><body>
 * addClass(document.body, 'is-large-screen')
 * // <body class='is-large-screen'><body>
 */
function addClass(element, classNames) {
  for (const className of classNames.split(' ')) {
    if (hasClass(element, className)) { continue }

    element.className += ' ' + className
  }
}

/**
 * Replaces bibliographic fields with Material Icons.
 */
function bFieldsToIcons() {
  const fields = document.querySelectorAll('.docinfo dt')

  for (const field of fields) {
    const icon = createElement('i', {
      class: 'material-icons',
      title: field.textContent,
      textContent: ICONS.get(field.className) || 'info'
    })

    updateElement(field, { innerHTML: '' })
    field.appendChild(icon)
  }
}

/**
 * Creates a HTML element.
 *
 * @param {Sting} type - Element name.
 * @param {Object} [attributes] - Attributes for the new element, same as
 *                                `attributes` in `updateElement`.
 * @return {HTMLElement}
 *
 * @example
 *
 * document.body.appendChild(createElement('input', {
 *   type: 'text',
 *   value: 'Hello world!',
 *   style: { color: 'green' }
 * }))
 */
function createElement(type, attributes) {
  const element = document.createElement(type)

  if (attributes) { updateElement(element, attributes) }

  return element
}

/**
 * Gets a Material icon that match with the file extension.
 *
 * @param {String} name - File name or path.
 * @return {String}
 *
 * @example
 *
 * fileToIcon('image.png')
 * // 'image'
 *
 * fileToIcon('https://domain.com/doc.pdf')
 * // 'picture_as_pdf'
 */
function fileToIcon(name) {
  switch (name.match(/\.\w+$/g)[0]) {
    case '.pdf':
      return 'picture_as_pdf'

    case '.jpg':
    case '.jpeg':
    case '.png':
    case '.svg':
      return 'image'

    default:
      return 'insert_drive_file'
  }
}

/**
 * Verifies if an element has a class.
 *
 * @param {HTMLElement} element - Element target.
 * @param {String} className - Class to verify.
 * @return {Boolean}
 *
 * @example
 *
 * // <body class='is-large-screen'><body>
 * hasClass(document.body, 'is-large-screen')
 * // true
 */
function hasClass(element, className) {
  return element.className.includes(className)
}

/**
 * Removes a HTML element.
 *
 * @param {HTMLElement} element - Element to delete.
 *
 * @example
 *
 * // <div id='test'>Test block</div>
 * removeElement(document.querySelector('#test'))
 */
function removeElement(element) {
  element.parentNode.removeChild(element)
}

/**
 * Removes classes from an element.
 *
 * @param {HTMLElement} element - Element where classes will be removed.
 * @param {String} classNames - Space separated classes to remove.
 *
 * @example
 *
 * // <body class='is-large-screen'><body>
 * removeClass(document.body, 'is-large-screen')
 * // <body><body>
 */
function removeClass(element, classNames) {
  for (const className of classNames.split(' ')) {
    if (!hasClass(element, className)) { continue }

    element.className = element.className
      .replace(new RegExp(className, 'g'), '')
      .replace(/ {2,}/g, ' ')
      .trim()
  }
}

/**
 * Removes unnecessary `@media print` from style sheets. Only supports
 * internals style sheets.
 */
function removeMediaPrint() {
  const sheets = document.styleSheets

  for (const sheet of sheets) {
    if (sheet.href) { continue }

    const rules = (sheet.cssRules) ? sheet.cssRules : sheet.rules
    let nRule = 0

    for (const rule of rules) {
      if (rule.cssText.includes('@media print')) { sheet.deleteRule(nRule) }

      ++nRule
    }
  }
}

/**
 * Shows the content that match with the given filter.
 *
 * @param {[type]} filter - Filter to show.
 *
 * @exaple
 *
 * selectFilter('debian')
 */
function selectFilter(filter) {
  let elements

  elements = document.querySelectorAll('.fl.is-visible')

  for (const element of elements) {
    removeClass(element, 'is-visible')
  }

  elements = document.querySelectorAll(`.fl-${filter}`)

  for (const element of elements) {
    addClass(element, 'is-visible')
  }
}

/**
 * Sets up the article options.
 */
function setupArticleOptions() {
  const options = document.querySelector('#options')

  // Main button

  const mainButton = options.querySelector('#options-button')

  updateElement(mainButton, { events: { click: () => {
    const buttons = options.querySelectorAll('button:not(#options-button)')

    let icon

    if (!hasClass(mainButton, 'open')) {
      let nButton = 1

      for (const button of buttons) {
        updateElement(button, { style: { bottom: 115 * (nButton++) + '%' } })
      }

      icon = 'close'
    } else {
      for (const button of buttons) {
        updateElement(button, { style: { bottom: '0px' } })
      }

      icon = 'more_vert'
    }

    toggleClass(mainButton, 'open')

    updateElement(
      mainButton.querySelector('i.material-icons'),
      { textContent: icon }
    )
  } } })

  // Theme button

  const themeButton = createElement('button', {
    id: 'theme-button',
    class: 'mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect ' +
           'mdl-button--accent',
    children: [
      createElement('i', {
        class: 'material-icons',
        textContent: 'invert_colors'
      })
    ],
    events: {
      click: () => {
        const container = document.querySelector('.mdl-layout')

        if (hasClass(container, 'theme-light')) {
          snackbar('Dark theme is enabled')
        } else {
          snackbar('Light theme is enabled')
        }

        toggleClass(container, 'theme-light theme-dark')
      }
    }
  })

  options.appendChild(themeButton)
  window.componentHandler.upgradeElement(themeButton)

  // Print button

  const printButton = options.querySelector('#print-button')
  updateElement(printButton, { events: { click: () => window.print() } })

  // Attachments

  const attachmentsMenu = options.querySelector('#attachments-menu')

  for (const file of window.ATTACHMENTS) {
    attachmentsMenu.appendChild(createElement('a', {
      href: file.url,
      download: file.name || '',
      children: [
        createElement('li', {
          class: 'mdl-menu__item',
          textContent: file.name || file.url,
          children: [
            createElement('i', {
              class: 'material-icons',
              textContent: file.icon || fileToIcon(file.url)
            })
          ]
        })
      ]
    }))
  }

  if (window.ATTACHMENTS.length === 0) {
    removeElement(options.querySelector('#attachments-button'))
  }
}

/**
 * Sets up the external links to open in a new tab.
 */
function setupExternalLinks() {
  const links = document.querySelectorAll('a:not([href^="#"])')

  for (const link of links) {
    if (link.href) { updateElement(link, { target: '_blank' }) }
  }
}

/**
 * Sets up filters
 */
function setupFilters() {
  const elements = document.querySelectorAll('.fl')
  const filters = []
  const pattern = /fl-[\w-]+/g

  // Create filters list

  for (const element of elements) {
    const elementFilters = element.className.match(pattern)

    for (let filter of elementFilters) {
      filter = filter.slice(3)

      if (filters.includes(filter)) { continue }
      filters.push(filter)
    }
  }

  selectFilter(filters[0])  // Set the first filter found as default
  filters.sort()

  for (const filter of filters) {
    const button = createElement('button', {
      class: 'mdl-button mdl-js-button mdl-button--raised ' +
             'mdl-button--accent mdl-js-ripple-effect',
      'data-filter': filter,
      textContent: filter.toUpperCase(),
      events: {
        click: () => {
          const filter = button.dataset.filter

          selectFilter(filter)
          snackbar(`Using filter: ${filter.toUpperCase()}`)
        }
      }
    })

    document.querySelector('#filter_selection').appendChild(button)
    window.componentHandler.upgradeElement(button)
  }
}

/**
 * Shows a message at the bottom of the screen.
 *
 * @param {String} message - Message to show.
 *
 * @example
 *
 * snackbar('Hello world!')
 */
function snackbar(message) {
  const container = document.querySelector('#snackbar')

  container.MaterialSnackbar.showSnackbar({ message })
}

/**
 * Toggles classes from an element.
 *
 * @param {HTMLElement} element - Element where classes will be toggled.
 * @param {String} classNames - Space separated classes to toggle.
 * @return {HTMLElement}
 *
 * @example
 *
 * // <body class='is-large-screen'><body>
 * toggleClass(document.body, 'is-large-screen is-small-screen')
 * // <body class='is-small-screen'><body>
 */
function toggleClass(element, classNames) {
  classNames = classNames.split(' ')

  for (const className of classNames) {
    if (!hasClass(element, className))  {
      addClass(element, className)
    } else {
      removeClass(element, className)
    }
  }
}

/**
 * Updates a HTML element. There are some special attributes:
 *
 * * `children`: iterable of elements to be added as `element`'s children.
 *
 * * `events`: object with events names as keys and handlers (or an array of
 *   handlers) as values
 *
 * @param {HTMLElement} element - Element to update.
 * @param {Object} attributes - Attributes for the element; the `style`
 *                              attribute must be an object with its
 *                              properties.
 * @return {HTMLElement}
 *
 * @example
 *
 * updateElement(document.body, {
 *   contenteditable: true,
 *   style: { backgroundColor: 'green'}
 * })
 */
function updateElement(element, attributes) {
  for (const [attribute, value] of Object.entries(attributes)) {
    switch (attribute) {
      case 'innerHTML':
      case 'textContent':
        element[attribute] = value
        break

      case 'style':
        for (const [property, pValue] of Object.entries(value)) {
          element[attribute][property] = pValue
        }

        break

      case 'children':
        for (const child of value) {
          element.appendChild(child)
        }

        break

      case 'events':
        for (const [event, handlers] of Object.entries(value)) {
          if (handlers instanceof Array) {
            for (const handler of handlers) {
              element.addEventListener(event, handler)
            }
          } else {
            element.addEventListener(event, handlers)
          }
        }

        break

      default:
        element.setAttribute(attribute, value)
        break
    }
  }

  return element
}
