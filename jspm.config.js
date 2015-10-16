System.config({
  baseURL: "/HR/",
  defaultJSExtensions: true,
  transpiler: "traceur",
  paths: {
    "github:*": "jspm_packages/github/*",
    "npm:*": "jspm_packages/npm/*"
  },
  shim: {
    "assets/lib/slider": {
      "deps": ["jquery"],
      "exports": "slidy"
    }
  },

  map: {
    "jquery": "github:components/jquery@2.1.4",
    "slider": "assets/js/lib/slider",
    "traceur": "github:jmcriffey/bower-traceur@0.0.91",
    "traceur-runtime": "github:jmcriffey/bower-traceur-runtime@0.0.91"
  }
});
