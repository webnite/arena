(() => {
  document.documentElement.classList.add("has-js");

  const schedules = {
    musculacao: {
      title: "Musculação livre",
      description: "Acesso ao salão de musculação e cardio.",
      icon: "ML",
      blocks: [
        {
          title: "Horário de funcionamento",
          rows: [
            { day: "Segunda a sexta", times: ["05:30 — 00:00"] },
            { day: "Sábado", times: ["08:00 — 12:00", "15:00 — 18:00"] },
            { day: "Domingo", times: ["15:00 — 18:00"] }
          ]
        }
      ]
    },
    spinning: {
      title: "Spinning",
      description: "Treino cardiovascular indoor com energia coletiva.",
      icon: "SP",
      blocks: [
        {
          title: "Turmas de spinning",
          rows: [
            { day: "Segunda", times: ["06:30 — 07:00", "16:30 — 17:30", "17:30 — 18:00"] },
            { day: "Terça", times: ["16:30 — 17:30", "17:30 — 18:00"] },
            { day: "Quarta", times: ["06:30 — 07:00", "16:30 — 17:30", "17:30 — 18:00"] },
            { day: "Quinta", times: ["16:30 — 17:30", "17:30 — 18:00"] },
            { day: "Sexta", times: ["06:30 — 07:00", "17:30 — 18:00"] }
          ]
        }
      ]
    },
    gap: {
      title: "GAP",
      description: "Treino focado em glúteos, abdômen e pernas.",
      icon: "GAP",
      blocks: [
        {
          title: "Turmas de GAP",
          rows: [
            { day: "Segunda", times: ["17:30 — 18:00"] },
            { day: "Quarta", times: ["17:30 — 18:00"] },
            { day: "Sexta", times: ["17:30 — 18:00"] }
          ]
        }
      ]
    },
    jump: {
      title: "Jump",
      description: "Aula dinâmica em mini trampolim.",
      icon: "JP",
      blocks: [
        {
          title: "Turmas de Jump",
          rows: [
            { day: "Segunda", times: ["18:00 — 18:30"] },
            { day: "Quarta", times: ["18:00 — 18:30"] }
          ]
        }
      ]
    },
    ritbox: {
      title: "RitBox",
      description: "Ritmo, golpes e condicionamento em uma aula intensa.",
      icon: "RB",
      blocks: [
        {
          title: "Turmas de RitBox",
          rows: [
            { day: "Terça", times: ["18:30 — 19:00"] },
            { day: "Quinta", times: ["18:30 — 19:00"] }
          ]
        }
      ]
    },
    fitdance: {
      title: "Fitdance",
      description: "Dança, música e movimento para todos os níveis.",
      icon: "FD",
      blocks: [
        {
          title: "Turmas de Fitdance",
          rows: [
            { day: "Segunda", times: ["19:00 — 20:00"] },
            { day: "Quarta", times: ["19:00 — 20:00"] },
            { day: "Sexta", times: ["19:00 — 20:00"] }
          ]
        }
      ]
    },
    funcional: {
      title: "Funcional Training",
      description: "Força, mobilidade e condicionamento em circuito.",
      icon: "FT",
      blocks: [
        {
          title: "Turmas de funcional",
          rows: [
            { day: "Terça", times: ["18:00 — 18:30"] },
            { day: "Quinta", times: ["18:00 — 18:30"] }
          ]
        }
      ]
    },
    abs: {
      title: "ABS · Abdômen",
      description: "Aula direcionada ao fortalecimento abdominal.",
      icon: "ABS",
      blocks: [
        {
          title: "Turmas de ABS",
          rows: [
            { day: "Terça", times: ["07:00 — 07:30", "17:30 — 18:00"] },
            { day: "Quinta", times: ["07:00 — 07:30", "17:30 — 18:00"] }
          ]
        }
      ]
    },
    "muay-thai": {
      title: "Muay Thai",
      description: "Artes marciais para técnica, disciplina e condicionamento.",
      icon: "MT",
      blocks: [
        {
          title: "Turmas de Muay Thai",
          rows: [
            { day: "Terça", times: ["20:00 — 21:00"] },
            { day: "Quinta", times: ["20:00 — 21:00"] }
          ]
        }
      ]
    }
  };

  const header = document.querySelector("[data-header]");
  const menuToggle = document.querySelector("[data-menu-toggle]");
  const menu = document.querySelector("[data-menu]");
  const modal = document.querySelector("[data-schedule-modal]");
  const modalTitle = modal?.querySelector("[data-modal-title]");
  const modalDescription = modal?.querySelector("[data-modal-description]");
  const modalSchedule = modal?.querySelector("[data-modal-schedule]");
  const modalIcon = modal?.querySelector(".modal-icon");
  const modalClose = modal?.querySelector("[data-modal-close]");
  let lastModalTrigger = null;
  const supportsNativeDialog = Boolean(modal && typeof modal.showModal === "function" && typeof modal.close === "function");

  const setMenuState = (open) => {
    if (!menuToggle || !menu) return;
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
    menu.classList.toggle("is-open", open);
    document.body.classList.toggle("menu-open", open);
  };

  menuToggle?.addEventListener("click", () => {
    setMenuState(menuToggle.getAttribute("aria-expanded") !== "true");
  });

  menu?.addEventListener("click", (event) => {
    if (event.target.closest("a")) setMenuState(false);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menuToggle?.getAttribute("aria-expanded") === "true") {
      setMenuState(false);
    }
    if (event.key === "Escape" && modal?.hasAttribute("open")) {
      event.preventDefault();
      closeSchedule();
    }
  });

  const updateHeader = () => {
    header?.classList.toggle("is-scrolled", window.scrollY > 60 && window.innerWidth > 820);
  };

  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });
  window.addEventListener("resize", () => {
    if (window.innerWidth > 820) setMenuState(false);
  });

  const revealItems = document.querySelectorAll("[data-reveal]");
  if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -7%", threshold: 0.08 });
    revealItems.forEach((item) => revealObserver.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  }

  const createScheduleBlock = (block) => {
    const section = document.createElement("section");
    section.className = "schedule-block";

    const heading = document.createElement("h3");
    heading.textContent = block.title;
    section.appendChild(heading);

    const list = document.createElement("ul");
    block.rows.forEach((row) => {
      const item = document.createElement("li");
      item.className = "schedule-row";

      const day = document.createElement("strong");
      day.textContent = row.day;
      item.appendChild(day);

      const times = document.createElement("div");
      times.className = "schedule-times";
      row.times.forEach((time) => {
        const timeLabel = document.createElement("span");
        timeLabel.textContent = time;
        times.appendChild(timeLabel);
      });
      item.appendChild(times);
      list.appendChild(item);
    });

    section.appendChild(list);
    return section;
  };

  const openSchedule = (classId, trigger) => {
    const classSchedule = schedules[classId];
    if (!classSchedule || !modal || !modalTitle || !modalDescription || !modalSchedule || !modalIcon) return;

    lastModalTrigger = trigger;
    modalTitle.textContent = classSchedule.title;
    modalDescription.textContent = classSchedule.description;
    modalIcon.textContent = classSchedule.icon;
    modalSchedule.replaceChildren(...classSchedule.blocks.map(createScheduleBlock));
    document.body.classList.add("modal-open");
    if (supportsNativeDialog) {
      modal.showModal();
    } else {
      modal.setAttribute("open", "");
      modal.setAttribute("role", "dialog");
      modal.setAttribute("aria-modal", "true");
      modal.classList.add("is-fallback-open");
    }
    modalClose?.focus();
  };

  const cleanupModal = () => {
    document.body.classList.remove("modal-open");
    modal?.classList.remove("is-fallback-open");
    modal?.removeAttribute("aria-modal");
    if (!supportsNativeDialog) modal?.removeAttribute("open");
    lastModalTrigger?.focus();
  };

  function closeSchedule() {
    if (!modal) return;
    if (supportsNativeDialog && modal.open) {
      modal.close();
    } else {
      cleanupModal();
    }
  }

  document.querySelectorAll("[data-class-id]").forEach((card) => {
    card.addEventListener("click", () => openSchedule(card.dataset.classId, card));
  });

  modalClose?.addEventListener("click", closeSchedule);

  modal?.addEventListener("click", (event) => {
    if (event.target === modal) closeSchedule();
  });

  modal?.addEventListener("close", cleanupModal);

  // Plans: the button opens the form of the plan; once it is sent the person goes on to the link of the plan (checkout or WhatsApp).
  // Without JavaScript the buttons are plain links, as before.
  const planModal = document.querySelector("[data-plan-modal]");
  const planForm = planModal?.querySelector("[data-plan-form]");
  const plans = {
    red: { title: "Plano Red", icon: "R", cta: "Continuar para o pagamento" },
    duplo: { title: "Plano Duplo", icon: "D", cta: "Continuar no WhatsApp" }
  };
  let planHref = "";
  let planTrigger = null;
  const planNative = Boolean(planModal && typeof planModal.showModal === "function");

  const openPlan = (key, trigger) => {
    const plan = plans[key];
    if (!plan || !planModal || !planForm) return false;
    planTrigger = trigger;
    planHref = trigger.getAttribute("href") || "";
    planModal.querySelector("[data-plan-title]").textContent = plan.title;
    planModal.querySelector("[data-plan-icon]").textContent = plan.icon;
    planModal.querySelector("[data-plan-cta]").textContent = plan.cta;
    planModal.querySelector("[data-plan-value]").value = key;
    planForm.querySelectorAll("[data-atlas-error]").forEach((node) => { node.hidden = true; });
    document.body.classList.add("modal-open");
    if (planNative) {
      planModal.showModal();
    } else {
      planModal.setAttribute("open", "");
      planModal.setAttribute("role", "dialog");
      planModal.setAttribute("aria-modal", "true");
      planModal.classList.add("is-fallback-open");
    }
    planForm.querySelector('input[type="tel"]')?.focus();
    return true;
  };

  const cleanupPlan = () => {
    document.body.classList.remove("modal-open");
    planModal?.classList.remove("is-fallback-open");
    planModal?.removeAttribute("aria-modal");
    if (!planNative) planModal?.removeAttribute("open");
    planTrigger?.focus();
  };

  const closePlan = () => {
    if (planNative && planModal?.open) planModal.close();
    else cleanupPlan();
  };

  document.querySelectorAll("[data-plan]").forEach((button) => {
    button.addEventListener("click", (event) => {
      if (openPlan(button.dataset.plan, button)) event.preventDefault();
    });
  });
  planModal?.querySelector("[data-plan-close]")?.addEventListener("click", closePlan);
  planModal?.addEventListener("click", (event) => { if (event.target === planModal) closePlan(); });
  planModal?.addEventListener("close", cleanupPlan);
  planForm?.addEventListener("atlas:submitted", () => {
    if (planHref) window.location.href = planHref;
  });

  const year = document.querySelector("[data-current-year]");
  if (year) year.textContent = new Date().getFullYear();
})();
