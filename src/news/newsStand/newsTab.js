import { initNewsContentRenderer } from "./newsList.js";

function renderTabButton(tabData, index, tabState) {
  const tabButton = document.createElement('button');
  tabButton.className = `tab ${index === 0 ? 'active' : ''}`;
  tabButton.setAttribute('data-tab', tabData.category);

  tabButton.innerHTML = `
    <span class="page-title">${tabData.tabName}</span>
    ${index === 0 ? `
      <span class="page-info">${tabState.pageCount}/${tabData.tabData.length}</span>
      <span class="progress-bar"></span>
    ` : ''}
  `;
  return tabButton;
}

function initTabs(tabsContainer, newsTabs, tabState) {
  newsTabs.forEach((tabData, index) => {
    const tabButton = renderTabButton(tabData, index, tabState);
    tabsContainer.appendChild(tabButton);
  });
}

function addTabClickListener(tabsContainer, newsTabs, tabState) {
  tabsContainer.addEventListener('click', (event) => {
    const clickedTab = event.target.closest('.tab');
    if (!clickedTab) return;

    const tabs = tabsContainer.querySelectorAll('.tab');
    tabs.forEach((tab, index) => {
      if (tab === clickedTab) {
        tabState.activeTabIndex = index;
        tabState.pageCount = 1;
        updateActiveTab(tabsContainer, newsTabs, tabState);
      }
    });
  });
}

function updateActiveTab(tabsContainer, newsTabs, tabState) {
  const tabs = tabsContainer.querySelectorAll('.tab');
  tabs.forEach((tab, index) => {
    if (index === tabState.activeTabIndex) {
      tab.classList.add('active');
      updateTabContent(tab, newsTabs, tabState);
      animateProgressBar(tab, tabsContainer, newsTabs, tabState);
    } else {
      tab.classList.remove('active');
      removeTabContent(tab);
    }
  });
  initNewsContentRenderer();
}

function updateTabContent(tab, newsTabs, tabState) {
  const tabData = newsTabs[tabState.activeTabIndex];
  const pageInfo = tab.querySelector('.page-info');
  if (pageInfo) {
    pageInfo.textContent = `${tabState.pageCount}/${tabData.tabData.length}`;
  } else {
    tab.insertAdjacentHTML('beforeend', `
      <span class="page-info">${tabState.pageCount}/${tabData.tabData.length}</span>
      <span class="progress-bar"></span>
    `);
  }
}

function removeTabContent(tab) {
  const pageInfo = tab.querySelector('.page-info');
  const progressBar = tab.querySelector('.progress-bar');
  if (pageInfo) pageInfo.remove();
  if (progressBar) progressBar.remove();
}

function animateProgressBar(tab, tabsContainer, newsTabs, tabState) {
  const progressBar = tab.querySelector('.progress-bar');
  if (progressBar) {
    progressBar.style.width = '0%';
    const totalDuration = 2000;
    const startTime = performance.now();

    let animationId = null;

    function animate() {
      const currentTime = performance.now();
      const elapsed = currentTime - startTime;
      const progress = Math.min(1, elapsed / totalDuration);

      progressBar.style.width = `${progress * 100}%`;

      if (progress < 1) {
        animationId = requestAnimationFrame(animate);
      } else {
        const tabs = tabsContainer.querySelectorAll('.tab');
        const activeTabIndex = tabState.activeTabIndex;
        const nextTabIndex = (activeTabIndex + 1) % tabs.length;

        tabState.pageCount++;

        const pageInfo = tab.querySelector('.page-info');
        const tabData = newsTabs[activeTabIndex];
        if (pageInfo && tabData) pageInfo.textContent = `${tabState.pageCount}/${tabData.tabData.length}`;

        if (tabState.pageCount > tabData.tabData.length) {
          tabState.activeTabIndex = nextTabIndex;
          tabState.pageCount = 1;

          tabs.forEach((tab, index) => {
            if (index === nextTabIndex) {
              tab.classList.add('active');
              updateTabContent(tab, newsTabs, tabState);
              animateProgressBar(tab, tabsContainer, newsTabs, tabState);
            } else {
              tab.classList.remove('active');
              removeTabContent(tab);
            }
          });
        } else {
          animateProgressBar(tab, tabsContainer, newsTabs, tabState);
        }

        initNewsContentRenderer();
      }
    }

    animationId = requestAnimationFrame(animate);

    tabsContainer.addEventListener('click', () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
        animationId = null;
      }
    });
  }
}

function initTabManager(tabsContainer, newsTabs) {
  const tabState = {
    pageCount: 1,
    activeTabIndex: 0
  };

  initTabs(tabsContainer, newsTabs, tabState);
  addTabClickListener(tabsContainer, newsTabs, tabState);
  animateProgressBar(tabsContainer.querySelector('.tab.active'), tabsContainer, newsTabs, tabState);
}

export { initTabManager };