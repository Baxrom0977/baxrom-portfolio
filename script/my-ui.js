const categoryButtons = document.querySelectorAll(".ui-sidebar__item");

const categoryPanels = document.querySelectorAll(".ui-category-panel");

categoryButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const category = button.dataset.category;
    const activePanel = document.querySelector(
      `[data-category-panel="${category}"]`,
    );

    if (!activePanel) {
      return;
    }

    categoryButtons.forEach((btn) => {
      btn.classList.remove("active");
    });

    categoryPanels.forEach((panel) => {
      panel.classList.remove("active");
    });

    button.classList.add("active");
    activePanel.classList.add("active");
  });
});
const categories = document.querySelectorAll(".ui-category-panel");

categories.forEach((category) => {
  const componentButtons = category.querySelectorAll(".ui-showcase-card");
  const componentPanels = category.querySelectorAll(".ui-component-panel");

  componentButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const componentName = button.dataset.component;

      const componentActive = category.querySelector(
        `[data-component-panel="${componentName}"]`,
      );
      if (!componentActive) return;

      componentButtons.forEach((btn) => {
        btn.classList.remove("active");
      });
      componentPanels.forEach((panel) => {
        panel.classList.remove("active");
      });

      button.classList.add("active");

      componentActive.classList.add("active");
    });
  });
});

const codeBlocks = document.querySelectorAll(".ui-code");

codeBlocks.forEach((codeBlock) => {
  const codeTabs = codeBlock.querySelectorAll(".ui-code__tab");
  const codePanels = codeBlock.querySelectorAll(".ui-code__panel");
  const copyButton = codeBlock.querySelector(".ui-code__copy");

  codeTabs.forEach((button) => {
    button.addEventListener("click", () => {
      const codeName = button.dataset.code;

      const activePanel = codeBlock.querySelector(
        `[data-code-panel="${codeName}"]`,
      );

      if (!activePanel) return;

      codeTabs.forEach((tab) => {
        tab.classList.remove("active");
      });

      codePanels.forEach((panel) => {
        panel.classList.remove("active");
      });

      button.classList.add("active");
      activePanel.classList.add("active");
    });
  });

  if (!copyButton) return;

  copyButton.addEventListener("click", async function () {
    const activeCode = codeBlock.querySelector(
      ".ui-code__panel.active .ui-code__content",
    );

    if (!activeCode) return;

    const codeText = activeCode.textContent.trim();

    try {
      await navigator.clipboard.writeText(codeText);

      copyButton.textContent = "Copied!";
    } catch (error) {
      copyButton.textContent = "Copy failed";

      console.error("Clipboard error:", error);
    }

    setTimeout(function () {
      copyButton.textContent = "Copy";
    }, 1500);
  });
});

// Loading button script

const loadingButton = document.querySelector(".bax-loading-button");

loadingButton.addEventListener("click", () => {
  const buttonText = loadingButton.querySelector(".bax-loading-button__text");

  loadingButton.classList.add("loading");
  loadingButton.disabled = true;
  buttonText.textContent = "Loading...";

  setTimeout(() => {
    loadingButton.classList.remove("loading");
    loadingButton.disabled = false;
    buttonText.textContent = "Submit";
  }, 2000);
});

// ==========//
// BASIC TAB //
// ==========//

const basicTabs = document.querySelector(".bax-basic-tabs");

const basicTabButtons = basicTabs.querySelectorAll(".bax-basic-tabs__button");

const basicTabPanels = basicTabs.querySelectorAll(".bax-basic-tabs__panel");

basicTabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const tabName = button.dataset.basicTab;

    const activePanel = basicTabs.querySelector(
      `[data-basic-panel="${tabName}"]`,
    );

    if (!activePanel) {
      return;
    }

    basicTabButtons.forEach((btn) => {
      btn.classList.remove("active");
    });

    basicTabPanels.forEach((panel) => {
      panel.classList.remove("active");
    });

    button.classList.add("active");
    activePanel.classList.add("active");
  });
});

// ==========//
// UNDERLINE TAB //
// ==========//

const underlineTabs = document.querySelector(".bax-underline-tabs");

const underlineTabButtons = underlineTabs.querySelectorAll(
  ".bax-underline-tabs__button",
);

const underlineTabPanels = underlineTabs.querySelectorAll(
  ".bax-underline-tabs__panel",
);

underlineTabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const tabName = button.dataset.underlineTab;

    const activePanel = underlineTabs.querySelector(
      `[data-underline-panel="${tabName}"]`,
    );

    if (!activePanel) {
      return;
    }

    underlineTabButtons.forEach((btn) => {
      btn.classList.remove("active");
    });

    underlineTabPanels.forEach((panel) => {
      panel.classList.remove("active");
    });

    button.classList.add("active");
    activePanel.classList.add("active");
  });
});

// ==========//
// PILL TAB //
// ==========//

const pillTabs = document.querySelector(".bax-pill-tabs");

const pillTabButtons = pillTabs.querySelectorAll(".bax-pill-tabs__button");

const pillTabPanels = pillTabs.querySelectorAll(".bax-pill-tabs__panel");

pillTabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const tabName = button.dataset.pillTab;

    const activePanel = pillTabs.querySelector(
      `[data-pill-panel="${tabName}"]`,
    );

    if (!activePanel) {
      return;
    }

    pillTabButtons.forEach((btn) => {
      btn.classList.remove("active");
    });

    pillTabPanels.forEach((panel) => {
      panel.classList.remove("active");
    });

    button.classList.add("active");
    activePanel.classList.add("active");
  });
});

// ==========//
// VERTICAL TAB //
// ==========//

const verticalTabs = document.querySelector(".bax-vertical-tabs");

const verticalTabButtons = verticalTabs.querySelectorAll(
  ".bax-vertical-tabs__button",
);

const verticalTabPanels = verticalTabs.querySelectorAll(
  ".bax-vertical-tabs__panel",
);

verticalTabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const tabName = button.dataset.verticalTab;

    const activePanel = verticalTabs.querySelector(
      `[data-vertical-panel="${tabName}"]`,
    );

    if (!activePanel) {
      return;
    }

    verticalTabButtons.forEach((btn) => {
      btn.classList.remove("active");
    });

    verticalTabPanels.forEach((panel) => {
      panel.classList.remove("active");
    });

    button.classList.add("active");
    activePanel.classList.add("active");
  });
});
// ==========//
//  MODAL //
// ==========//

function focusAfterModalOpen(overlay, element) {
  let attempts = 0;

  function tryFocus() {
    if (!overlay.classList.contains("active")) {
      return;
    }

    const styles = getComputedStyle(element);

    const isVisible =
      styles.display !== "none" &&
      styles.visibility !== "hidden" &&
      element.getClientRects().length > 0;

    if (isVisible) {
      element.focus({ preventScroll: true });

      if (document.activeElement === element) {
        return;
      }
    }

    attempts++;

    if (attempts < 30) {
      requestAnimationFrame(tryFocus);
    }
  }

  requestAnimationFrame(tryFocus);
}

// ==========//
// BASIC MODAL //
// ==========//

const basicModalOpen = document.querySelector(".bax-basic-modal__open");

const basicModalOverlay = document.querySelector(".bax-basic-modal__overlay");

const basicModal = document.querySelector(".bax-basic-modal");

const basicModalClose = document.querySelector(".bax-basic-modal__close");

const basicModalCancel = document.querySelector(".bax-basic-modal__cancel");

function openBasicModal() {
  basicModalOverlay.classList.add("active");

  basicModalOverlay.removeAttribute("inert");
  basicModalOverlay.setAttribute("aria-hidden", "false");

  focusAfterModalOpen(basicModalOverlay, basicModalClose);
}

function closeBasicModal() {
  basicModalOverlay.classList.remove("active");

  basicModalOverlay.setAttribute("inert", "");
  basicModalOverlay.setAttribute("aria-hidden", "true");

  basicModalOpen.focus();
}

function trapBasicModalFocus(event) {
  if (event.key !== "Tab") {
    return;
  }

  const focusableElements = basicModal.querySelectorAll(
    'button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
  );

  if (focusableElements.length === 0) {
    return;
  }

  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];

  if (!basicModal.contains(document.activeElement)) {
    event.preventDefault();
    firstElement.focus();
    return;
  }

  if (event.shiftKey && document.activeElement === firstElement) {
    event.preventDefault();
    lastElement.focus();
  } else if (!event.shiftKey && document.activeElement === lastElement) {
    event.preventDefault();
    firstElement.focus();
  }
}

basicModalOpen.addEventListener("click", openBasicModal);

basicModalClose.addEventListener("click", closeBasicModal);

basicModalCancel.addEventListener("click", closeBasicModal);

basicModalOverlay.addEventListener("click", function (event) {
  if (event.target === basicModalOverlay) {
    closeBasicModal();
  }
});

document.addEventListener("keydown", function (event) {
  if (!basicModalOverlay.classList.contains("active")) {
    return;
  }

  if (event.key === "Escape") {
    closeBasicModal();
    return;
  }

  trapBasicModalFocus(event);
});

// ==========//
// CONFIRM MODAL //
// ==========//

const confirmModalOpen = document.querySelector(".bax-confirm-modal__open");

const confirmModalOverlay = document.querySelector(
  ".bax-confirm-modal__overlay",
);

const confirmModal = document.querySelector(".bax-confirm-modal");

const confirmModalCancel = document.querySelector(".bax-confirm-modal__cancel");

const confirmModalDelete = document.querySelector(".bax-confirm-modal__delete");

function openConfirmModal() {
  confirmModalOverlay.classList.add("active");

  confirmModalOverlay.removeAttribute("inert");
  confirmModalOverlay.setAttribute("aria-hidden", "false");

  focusAfterModalOpen(confirmModalOverlay, confirmModalCancel);
}

function closeConfirmModal() {
  confirmModalOverlay.classList.remove("active");

  confirmModalOverlay.setAttribute("inert", "");
  confirmModalOverlay.setAttribute("aria-hidden", "true");

  confirmModalOpen.focus();
}

function trapConfirmModalFocus(event) {
  if (event.key !== "Tab") {
    return;
  }

  const focusableElements = confirmModal.querySelectorAll(
    'button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
  );

  if (focusableElements.length === 0) {
    return;
  }

  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];

  if (!confirmModal.contains(document.activeElement)) {
    event.preventDefault();
    firstElement.focus();
    return;
  }

  if (event.shiftKey && document.activeElement === firstElement) {
    event.preventDefault();
    lastElement.focus();
  } else if (!event.shiftKey && document.activeElement === lastElement) {
    event.preventDefault();
    firstElement.focus();
  }
}

confirmModalOpen.addEventListener("click", openConfirmModal);

confirmModalCancel.addEventListener("click", closeConfirmModal);

confirmModalDelete.addEventListener("click", closeConfirmModal);

confirmModalOverlay.addEventListener("click", function (event) {
  if (event.target === confirmModalOverlay) {
    closeConfirmModal();
  }
});

document.addEventListener("keydown", function (event) {
  if (!confirmModalOverlay.classList.contains("active")) {
    return;
  }

  if (event.key === "Escape") {
    closeConfirmModal();
    return;
  }

  trapConfirmModalFocus(event);
});
// ==========//
// FORM MODAL //
// ==========//

const formModalOpen = document.querySelector(".bax-form-modal__open");

const formModalOverlay = document.querySelector(".bax-form-modal__overlay");

const formModal = document.querySelector(".bax-form-modal");

const formModalClose = document.querySelector(".bax-form-modal__close");

const formModalCancel = document.querySelector(".bax-form-modal__cancel");

const formModalForm = document.querySelector(".bax-form-modal__form");

const formModalFirstInput = formModal.querySelector(".bax-form-modal__input");

function openFormModal() {
  formModalOverlay.classList.add("active");

  formModalOverlay.removeAttribute("inert");
  formModalOverlay.setAttribute("aria-hidden", "false");

  focusAfterModalOpen(formModalOverlay, formModalFirstInput);
}

function closeFormModal() {
  formModalOverlay.classList.remove("active");

  formModalOverlay.setAttribute("inert", "");
  formModalOverlay.setAttribute("aria-hidden", "true");

  formModalOpen.focus();
}

function trapFormModalFocus(event) {
  if (event.key !== "Tab") {
    return;
  }

  const focusableElements = formModal.querySelectorAll(
    'button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
  );
  if (focusableElements.length === 0) {
    return;
  }

  const firstElement = focusableElements[0];

  const lastElement = focusableElements[focusableElements.length - 1];

  if (!formModal.contains(document.activeElement)) {
    event.preventDefault();
    firstElement.focus();
    return;
  }

  if (event.shiftKey && document.activeElement === firstElement) {
    event.preventDefault();
    lastElement.focus();
  } else if (!event.shiftKey && document.activeElement === lastElement) {
    event.preventDefault();
    firstElement.focus();
  }
}

formModalOpen.addEventListener("click", openFormModal);

formModalClose.addEventListener("click", closeFormModal);

formModalCancel.addEventListener("click", closeFormModal);

formModalOverlay.addEventListener("click", function (event) {
  if (event.target === formModalOverlay) {
    closeFormModal();
  }
});

formModalForm.addEventListener("submit", function (event) {
  event.preventDefault();

  formModalForm.reset();

  closeFormModal();
});

document.addEventListener("keydown", function (event) {
  if (!formModalOverlay.classList.contains("active")) {
    return;
  }

  if (event.key === "Escape") {
    closeFormModal();
    return;
  }

  trapFormModalFocus(event);
});

// ==========//
// FULLSCREEN MODAL //
// ==========//

const fullscreenModalOpen = document.querySelector(
  ".bax-fullscreen-modal__open",
);

const fullscreenModalOverlay = document.querySelector(
  ".bax-fullscreen-modal__overlay",
);

const fullscreenModal = document.querySelector(".bax-fullscreen-modal");

const fullscreenModalClose = document.querySelector(
  ".bax-fullscreen-modal__close",
);

function openFullscreenModal() {
  fullscreenModalOverlay.classList.add("active");

  fullscreenModalOverlay.removeAttribute("inert");
  fullscreenModalOverlay.setAttribute("aria-hidden", "false");

  focusAfterModalOpen(fullscreenModalOverlay, fullscreenModalClose);
}

function closeFullscreenModal() {
  fullscreenModalOverlay.classList.remove("active");

  fullscreenModalOverlay.setAttribute("inert", "");
  fullscreenModalOverlay.setAttribute("aria-hidden", "true");

  fullscreenModalOpen.focus();
}

function trapFullscreenModalFocus(event) {
  if (event.key !== "Tab") {
    return;
  }

  const focusableElements = fullscreenModal.querySelectorAll(
    'button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
  );

  if (focusableElements.length === 0) {
    return;
  }

  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];

  if (!fullscreenModal.contains(document.activeElement)) {
    event.preventDefault();
    firstElement.focus();
    return;
  }

  if (event.shiftKey && document.activeElement === firstElement) {
    event.preventDefault();
    lastElement.focus();
  } else if (!event.shiftKey && document.activeElement === lastElement) {
    event.preventDefault();
    firstElement.focus();
  }
}

fullscreenModalOpen.addEventListener("click", openFullscreenModal);

fullscreenModalClose.addEventListener("click", closeFullscreenModal);

fullscreenModalOverlay.addEventListener("click", function (event) {
  if (event.target === fullscreenModalOverlay) {
    closeFullscreenModal();
  }
});

document.addEventListener("keydown", function (event) {
  if (!fullscreenModalOverlay.classList.contains("active")) {
    return;
  }

  if (event.key === "Escape") {
    closeFullscreenModal();
    return;
  }

  trapFullscreenModalFocus(event);
});

// ==========//
// BASIC ACCORDIONS //
// ==========//

const basicAccordionItems = document.querySelectorAll(
  ".bax-basic-accordion__item",
);

basicAccordionItems.forEach((item) => {
  const button = item.querySelector(".bax-basic-accordion__button");
  const icon = item.querySelector("strong");

  button.addEventListener("click", () => {
    const isActive = item.classList.contains("active");

    basicAccordionItems.forEach((accordionItem) => {
      accordionItem.classList.remove("active");

      const accordionIcon = accordionItem.querySelector("strong");
      accordionIcon.textContent = "+";
    });

    if (!isActive) {
      item.classList.add("active");
      icon.textContent = "−";
    }
  });
});

// ==========//
// ICON ACCORDIONS //
// ==========//

const iconAccordion = document.querySelector(".bax-icon-accordion");

const iconAccordionItems = iconAccordion.querySelectorAll(
  ".bax-icon-accordion__item",
);

iconAccordionItems.forEach((item) => {
  const button = item.querySelector(".bax-icon-accordion__button");

  button.addEventListener("click", () => {
    const isActive = item.classList.contains("active");

    iconAccordionItems.forEach((accordionItem) => {
      accordionItem.classList.remove("active");

      const accordionButton = accordionItem.querySelector(
        ".bax-icon-accordion__button",
      );

      accordionButton.setAttribute("aria-expanded", "false");
    });

    if (!isActive) {
      item.classList.add("active");

      button.setAttribute("aria-expanded", "true");
    }
  });
});

// ==========//
// FAQ ACCORDIONS //
// ==========//

const faqAccordionItems = document.querySelectorAll(".bax-faq-accordion__item");

faqAccordionItems.forEach((item) => {
  const button = item.querySelector(".bax-faq-accordion__button");

  const icon = item.querySelector("strong");

  button.addEventListener("click", () => {
    const isActive = item.classList.contains("active");

    faqAccordionItems.forEach((accordionItem) => {
      accordionItem.classList.remove("active");

      const accordionButton = accordionItem.querySelector(
        ".bax-faq-accordion__button",
      );

      const accordionIcon = accordionItem.querySelector("strong");

      accordionButton.setAttribute("aria-expanded", "false");

      accordionIcon.textContent = "+";
    });

    if (!isActive) {
      item.classList.add("active");

      button.setAttribute("aria-expanded", "true");

      icon.textContent = "−";
    }
  });
});

// ==========//
// MULTIPLE ACCORDIONS //
// ==========//

const multipleAccordionItems = document.querySelectorAll(
  ".bax-multiple-accordion__item",
);

multipleAccordionItems.forEach((item) => {
  const button = item.querySelector(".bax-multiple-accordion__button");

  const icon = item.querySelector("strong");

  button.addEventListener("click", () => {
    item.classList.toggle("active");

    const isActive = item.classList.contains("active");

    button.setAttribute("aria-expanded", String(isActive));

    icon.textContent = isActive ? "−" : "+";
  });
});

// ==========//
// MULTIPLE ACCORDIONS //
// ==========//

const successToastShow = document.querySelector(".bax-success-toast__show");

const successToast = document.querySelector(".bax-success-toast");

const successToastClose = document.querySelector(".bax-success-toast__close");

let successToastTimer;

function closeSuccessToast() {
  successToast.classList.remove("active");
}

successToastShow.addEventListener("click", () => {
  clearTimeout(successToastTimer);

  successToast.classList.add("active");

  successToastTimer = setTimeout(() => {
    closeSuccessToast();
  }, 3000);
});

successToastClose.addEventListener("click", () => {
  clearTimeout(successToastTimer);
  closeSuccessToast();
});

// ==========//
//  ERROR TOAST //
// ==========//
const errorToastShow = document.querySelector(".bax-error-toast__show");

const errorToast = document.querySelector(".bax-error-toast");

const errorToastClose = document.querySelector(".bax-error-toast__close");

let errorToastTimer;

function closeErrorToast() {
  errorToast.classList.remove("active");
}

errorToastShow.addEventListener("click", () => {
  clearTimeout(errorToastTimer);

  errorToast.classList.add("active");

  errorToastTimer = setTimeout(() => {
    closeErrorToast();
  }, 3000);
});

errorToastClose.addEventListener("click", () => {
  clearTimeout(errorToastTimer);
  closeErrorToast();
});
// ==========//
// INFO TOAST  //
// ==========//

const infoToastShow = document.querySelector(".bax-info-toast__show");

const infoToast = document.querySelector(".bax-info-toast");

const infoToastClose = document.querySelector(".bax-info-toast__close");

let infoToastTimer;

function closeInfoToast() {
  infoToast.classList.remove("active");
}

infoToastShow.addEventListener("click", () => {
  clearTimeout(infoToastTimer);

  infoToast.classList.add("active");

  infoToastTimer = setTimeout(() => {
    closeInfoToast();
  }, 3000);
});

infoToastClose.addEventListener("click", () => {
  clearTimeout(infoToastTimer);
  closeInfoToast();
});

// ==========//
// ACTION TOAST  //
// ==========//
const actionToastShow = document.querySelector(".bax-action-toast__show");

const actionToast = document.querySelector(".bax-action-toast");

const actionToastUndo = document.querySelector(".bax-action-toast__undo");

const actionToastClose = document.querySelector(".bax-action-toast__close");

const actionToastTitle = actionToast.querySelector(
  ".bax-action-toast__text strong",
);

const actionToastDescription = actionToast.querySelector(
  ".bax-action-toast__text p",
);

let actionToastTimer;

function closeActionToast() {
  actionToast.classList.remove("active");
}

actionToastShow.addEventListener("click", () => {
  clearTimeout(actionToastTimer);

  actionToastTitle.textContent = "Item deleted";
  actionToastDescription.textContent = "You can restore it for a few seconds.";

  actionToastUndo.style.display = "block";

  actionToast.classList.add("active");

  actionToastTimer = setTimeout(() => {
    closeActionToast();
  }, 4000);
});

actionToastUndo.addEventListener("click", () => {
  clearTimeout(actionToastTimer);

  actionToastTitle.textContent = "Item restored";
  actionToastDescription.textContent = "Your item has been restored.";

  actionToastUndo.style.display = "none";

  actionToastTimer = setTimeout(() => {
    closeActionToast();
  }, 1800);
});

actionToastClose.addEventListener("click", () => {
  clearTimeout(actionToastTimer);
  closeActionToast();
});

// ==========//
// BASIC BURGER //
// ==========//

const basicBurgerButton = document.querySelector(".bax-basic-burger__button");

const basicBurgerMenu = document.querySelector(".bax-basic-burger__menu");

basicBurgerButton.addEventListener("click", () => {
  basicBurgerMenu.classList.toggle("active");
  basicBurgerButton.classList.toggle("active");

  const isOpen = basicBurgerMenu.classList.contains("active");

  basicBurgerButton.setAttribute("aria-expanded", String(isOpen));

  basicBurgerButton.setAttribute(
    "aria-label",
    isOpen ? "Close navigation" : "Open navigation",
  );
});

// ==========//
// ANIMATED BURGER //
// ==========//

const animatedBurger = document.querySelector(".bax-animated-burger");

animatedBurger.addEventListener("click", () => {
  animatedBurger.classList.toggle("active");

  const isActive = animatedBurger.classList.contains("active");

  animatedBurger.setAttribute("aria-expanded", String(isActive));

  animatedBurger.setAttribute(
    "aria-label",
    isActive ? "Close menu" : "Open menu",
  );
});
// ==========//
//  //
// ==========//

const slideMenuOpen = document.querySelector(".bax-slide-menu__open");

const slideMenu = document.querySelector(".bax-slide-menu");

const slideMenuClose = document.querySelector(".bax-slide-menu__close");

const slideMenuOverlay = document.querySelector(".bax-slide-menu__overlay");

function openSlideMenu() {
  slideMenu.classList.add("active");
  slideMenuOverlay.classList.add("active");

  slideMenuOpen.setAttribute("aria-expanded", "true");

  slideMenu.removeAttribute("inert");
  slideMenu.setAttribute("aria-hidden", "false");

  slideMenuClose.focus();
}

function closeSlideMenu() {
  slideMenu.classList.remove("active");
  slideMenuOverlay.classList.remove("active");

  slideMenuOpen.setAttribute("aria-expanded", "false");

  slideMenu.setAttribute("inert", "");
  slideMenu.setAttribute("aria-hidden", "true");

  slideMenuOpen.focus();
}

slideMenuOpen.addEventListener("click", openSlideMenu);

slideMenuClose.addEventListener("click", closeSlideMenu);

slideMenuOverlay.addEventListener("click", closeSlideMenu);
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape" && slideMenu.classList.contains("active")) {
    closeSlideMenu();
  }
});

// ==========//
//  //
// ==========//

const fullscreenMenuOpen = document.querySelector(".bax-fullscreen-menu__open");

const fullscreenMenu = document.querySelector(".bax-fullscreen-menu");

const fullscreenMenuClose = document.querySelector(
  ".bax-fullscreen-menu__close",
);

function openFullscreenMenu() {
  fullscreenMenu.classList.add("active");

  fullscreenMenuOpen.setAttribute("aria-expanded", "true");
}

function closeFullscreenMenu() {
  fullscreenMenu.classList.remove("active");

  fullscreenMenuOpen.setAttribute("aria-expanded", "false");
}

fullscreenMenuOpen.addEventListener("click", openFullscreenMenu);

fullscreenMenuClose.addEventListener("click", closeFullscreenMenu);

// ==========//
// profille card //
// ==========//

const profileFollowButton = document.querySelector(".bax-profile-card__follow");

profileFollowButton.addEventListener("click", () => {
  profileFollowButton.classList.toggle("active");

  const isFollowing = profileFollowButton.classList.contains("active");

  profileFollowButton.textContent = isFollowing ? "Following" : "Follow";
});

// ==========//
//  //
// ==========//

const productCartButton = document.querySelector(".bax-product-card__cart");

productCartButton.addEventListener("click", () => {
  productCartButton.classList.toggle("active");

  const isAdded = productCartButton.classList.contains("active");

  productCartButton.textContent = isAdded ? "Added ✓" : "Add to cart";
});

// ==========//
//  //
// ==========//

const fadeAnimationBox = document.querySelector(".bax-fade-animation__box");

const fadeAnimationPlay = document.querySelector(".bax-fade-animation__play");

fadeAnimationPlay.addEventListener("click", () => {
  fadeAnimationBox.classList.remove("active");

  void fadeAnimationBox.offsetWidth;

  fadeAnimationBox.classList.add("active");
});
// ==========//
//  //
// ==========//

const revealAnimationBox = document.querySelector(".bax-reveal-animation__box");

const revealAnimationPlay = document.querySelector(
  ".bax-reveal-animation__play",
);

revealAnimationPlay.addEventListener("click", () => {
  revealAnimationBox.classList.remove("active");

  void revealAnimationBox.offsetWidth;

  revealAnimationBox.classList.add("active");
});
// ==========//
//  //
// ==========//
// ==========//
//  //
// ==========//
// ==========//
//  //
// ==========//
// ==========//
//  //
// ==========//
