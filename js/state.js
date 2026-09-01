const state = {
    tasks: [],

    currentView: "dashboard",

    selectedTaskId: null,

    filters: {
        search: "",
        category: "all",
        priority: "all",
        status: "all"
    },

    theme: "dark",

    focus: {
        duration: 20 * 60,
        remaining: 20 * 60,
        isRunning: false,
        interval: null
    }
};