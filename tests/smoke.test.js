/**
 * Smoke Tests — DevOps Demo
 * Tests simples pero reales que corren en el pipeline
 */

const fs = require("fs");
const path = require("path");

let passed = 0;
let failed = 0;

function test(name, fn) {
  try {
    fn();
    console.log(`  ✅ PASS  ${name}`);
    passed++;
  } catch (e) {
    console.log(`  ❌ FAIL  ${name}`);
    console.log(`         ${e.message}`);
    failed++;
  }
}

function expect(value) {
  return {
    toBe: (expected) => {
      if (value !== expected)
        throw new Error(`Expected ${expected}, got ${value}`);
    },
    toContain: (substr) => {
      if (!value.includes(substr))
        throw new Error(`Expected to contain "${substr}"`);
    },
    toBeGreaterThan: (n) => {
      if (value <= n)
        throw new Error(`Expected ${value} > ${n}`);
    },
  };
}

// ── Leer el HTML ─────────────────────────────────────
const htmlPath = path.join(__dirname, "../src/index.html");
const html = fs.readFileSync(htmlPath, "utf8");

console.log("\n🧪 Ejecutando smoke tests...\n");

// TEST 1: El archivo existe y no está vacío
test("index.html existe y tiene contenido", () => {
  expect(html.length).toBeGreaterThan(100);
});

// TEST 2: Tiene estructura HTML básica
test("Tiene DOCTYPE y estructura HTML válida", () => {
  expect(html).toContain("<!DOCTYPE html>");
  expect(html).toContain("<html");
  expect(html).toContain("</html>");
});

// TEST 3: Tiene título en el head
test("Tiene <title> definido", () => {
  expect(html).toContain("<title>");
});

// TEST 4: Tiene el elemento h1 principal
test("Tiene heading principal <h1>", () => {
  expect(html).toContain("<h1>");
});

// TEST 5: Tiene charset UTF-8
test("Charset UTF-8 configurado", () => {
  expect(html).toContain('charset="UTF-8"');
});

// TEST 6: Tiene viewport para responsive
test("Meta viewport presente (responsive)", () => {
  expect(html).toContain("viewport");
});

// TEST 7: No tiene errores de sintaxis obvios (tags sin cerrar básicos)
test("Tags <head> y <body> correctamente cerrados", () => {
  expect(html).toContain("</head>");
  expect(html).toContain("</body>");
});

// TEST 8: Tiene el badge de AWS (marca de la demo)
test("Badge de deploy presente en la página", () => {
  expect(html).toContain("AWS S3");
});

// ── Resultado ────────────────────────────────────────
console.log(`\n${"─".repeat(40)}`);
console.log(`  Tests: ${passed + failed}  |  ✅ ${passed} passed  |  ❌ ${failed} failed`);
console.log(`${"─".repeat(40)}\n`);

if (failed > 0) {
  console.log("💥 Pipeline detenido — hay tests fallando.\n");
  process.exit(1);
} else {
  console.log("🚀 Todos los tests pasaron — listo para deploy.\n");
  process.exit(0);
}
