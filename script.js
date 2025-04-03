// Инициализация слайдера
const slider = tns({
	container: '.slider',
	items: 1,
	slideBy: 'page',
	autoplay: false,
	controls: true,
	nav: true,
	navPosition: 'bottom',
	controlsText: ['‹', '›'],
	center: true,
	responsive: {
		768: {
			items: 1,
		},
	},
})

// Функция для переключения display: flex/block
function toggleFlexDisplay(id, display) {
	const container = document.getElementById(id)
	container.style.display = display
	document.getElementById(id + '-value').textContent = display

	// Обновляем активную кнопку
	const buttons = container.nextElementSibling.querySelectorAll('button')
	buttons.forEach(btn => {
		if (btn.textContent.includes(display)) {
			btn.classList.add('active')
		} else {
			btn.classList.remove('active')
		}
	})
}

// Функция для изменения flex-direction
function changeFlexDirection(direction) {
	const container = document.getElementById('direction-demo')
	container.style.flexDirection = direction
	document.getElementById('direction-value').textContent = direction

	// Обновляем активную кнопку
	const buttons = container.nextElementSibling.querySelectorAll('button')
	buttons.forEach(btn => {
		if (btn.textContent === direction) {
			btn.classList.add('active')
		} else {
			btn.classList.remove('active')
		}
	})
}

// Функция для изменения justify-content
function changeJustifyContent(justify) {
	const container = document.getElementById('justify-demo')
	container.style.justifyContent = justify
	document.getElementById('justify-value').textContent = justify

	// Обновляем активную кнопку
	const buttons = container.nextElementSibling.querySelectorAll('button')
	buttons.forEach(btn => {
		if (btn.textContent === justify) {
			btn.classList.add('active')
		} else {
			btn.classList.remove('active')
		}
	})
}

// Функция для изменения align-items
function changeAlignItems(align) {
	const container = document.getElementById('align-demo')
	container.style.alignItems = align
	document.getElementById('align-value').textContent = align

	// Обновляем активную кнопку
	const buttons = container.nextElementSibling.querySelectorAll('button')
	buttons.forEach(btn => {
		if (btn.textContent === align) {
			btn.classList.add('active')
		} else {
			btn.classList.remove('active')
		}
	})
}

// Функция для переключения навигационного меню
function toggleNavMenu(type) {
	const menu = document.getElementById('nav-menu')
	if (type === 'space-between') {
		menu.style.justifyContent = 'space-between'
		menu.children[0].style.marginRight = '0'
	} else {
		menu.style.justifyContent = 'flex-start'
		menu.children[0].style.marginRight = 'auto'
	}

	// Обновляем активную кнопку
	const buttons = menu.nextElementSibling.querySelectorAll('button')
	buttons.forEach(btn => {
		if (
			(btn.textContent === 'space-between' && type === 'space-between') ||
			(btn.textContent === 'С отступом справа' && type === 'default')
		) {
			btn.classList.add('active')
		} else {
			btn.classList.remove('active')
		}
	})
}

// Функция для изменения макета карточек товаров
function changeProductsLayout(layout) {
	const grid = document.getElementById('product-grid')
	if (layout === 'row') {
		grid.style.flexDirection = 'column'
		const items = grid.querySelectorAll('div[style*="flex:"]')
		items.forEach(item => {
			item.style.flex = '1 1 auto'
		})
	} else {
		grid.style.flexDirection = 'row'
		const items = grid.querySelectorAll('div[style*="flex:"]')
		items.forEach(item => {
			item.style.flex = '1 1 200px'
		})
	}

	// Обновляем активную кнопку
	const buttons = grid.nextElementSibling.querySelectorAll('button')
	buttons.forEach(btn => {
		if (
			(btn.textContent === 'Строка' && layout === 'row') ||
			(btn.textContent === 'Сетка' && layout === 'grid')
		) {
			btn.classList.add('active')
		} else {
			btn.classList.remove('active')
		}
	})
}

// Функция для установки свойств в песочнице
function setSandboxProperty(property, value) {
	const sandbox = document.getElementById('sandbox')
	sandbox.style[property] = value

	// Обновляем отображаемое значение - преобразуем camelCase в lowercase
	document.getElementById('sandbox-' + property.toLowerCase()).textContent =
		value

	// Обновляем активную кнопку
	const propertySection = Array.from(
		document.querySelectorAll('#sandbox + .controls > div')
	).find(div =>
		div
			.querySelector('h4')
			.textContent.toLowerCase()
			.includes(property.toLowerCase())
	)

	if (propertySection) {
		const buttons = propertySection.querySelectorAll('button')
		buttons.forEach(btn => {
			if (btn.textContent === value) {
				btn.classList.add('active')
			} else {
				btn.classList.remove('active')
			}
		})
	}
}

// Добавим функцию для добавления новых элементов в песочницу
function addSandboxItem() {
	const sandbox = document.getElementById('sandbox')
	const itemsCount = sandbox.children.length
	const newItem = document.createElement('div')
	newItem.className = 'flex-item'
	newItem.textContent = itemsCount + 1
	sandbox.appendChild(newItem)
}

// Функция для удаления последнего элемента из песочницы
function removeSandboxItem() {
	const sandbox = document.getElementById('sandbox')
	if (sandbox.children.length > 1) {
		sandbox.removeChild(sandbox.lastChild)
	}
}

// Функция для сброса всех настроек песочницы к начальным значениям
function resetSandbox() {
	const sandbox = document.getElementById('sandbox')

	// Сбрасываем все стили
	sandbox.style.flexDirection = 'row'
	sandbox.style.justifyContent = 'flex-start'
	sandbox.style.alignItems = 'stretch'
	sandbox.style.flexWrap = 'nowrap'

	// Обновляем отображаемые значения
	document.getElementById('sandbox-flexdirection').textContent = 'row'
	document.getElementById('sandbox-justifycontent').textContent = 'flex-start'
	document.getElementById('sandbox-alignitems').textContent = 'stretch'
	document.getElementById('sandbox-flexwrap').textContent = 'nowrap'

	// Обновляем активные кнопки
	const controls = document.querySelector('#sandbox + .controls')
	controls.querySelectorAll('button').forEach(btn => {
		if (['row', 'flex-start', 'stretch', 'nowrap'].includes(btn.textContent)) {
			btn.classList.add('active')
		} else {
			btn.classList.remove('active')
		}
	})

	// Сбрасываем элементы песочницы
	while (sandbox.children.length > 5) {
		sandbox.removeChild(sandbox.lastChild)
	}
	while (sandbox.children.length < 5) {
		addSandboxItem()
	}
}

// Функция для инициализации интерактивных элементов после загрузки страницы
document.addEventListener('DOMContentLoaded', function () {
	// Вызываем функции для установки начальных стилей
	toggleFlexDisplay('basic-demo', 'flex')
	changeFlexDirection('row')
	changeJustifyContent('flex-start')
	changeAlignItems('stretch')
	toggleNavMenu('default')
	changeProductsLayout('grid')

	// Добавляем управление размером элементов в песочнице
	const sandboxControls = document.querySelector('#sandbox + .controls')

	// Создаем новую секцию для управления элементами
	const itemsControl = document.createElement('div')
	itemsControl.innerHTML = `
        <h4>Элементы:</h4>
        <button onclick="addSandboxItem()">Добавить элемент</button>
        <button onclick="removeSandboxItem()">Удалить элемент</button>
        <button onclick="resetSandbox()">Сбросить</button>
    `
	sandboxControls.appendChild(itemsControl)

	// Добавляем анимации при прокрутке
	const sections = document.querySelectorAll('.section')

	const observer = new IntersectionObserver(
		entries => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					entry.target.classList.add('fade-in')
				}
			})
		},
		{
			threshold: 0.1,
		}
	)

	sections.forEach(section => {
		observer.observe(section)
	})
})
