export const generateHanoiSteps = (n) => {
  const origin = 'A'
  const helper = 'B'
  const destiny = 'C'

  const pasos = [];

  function resolver(n, origin, helper, destiny) {
    if (n === 1) {
      pasos.push({ ring: 1, from: origin, to: destiny });
      return;
    }

    // Paso 1: mover n-1 anillos del origen al auxiliar
    resolver(n - 1, origin, destiny, helper);

    // Paso 2: mover el anillo más grande al destino
    pasos.push({ ring: n, from: origin, to: destiny });

    // Paso 3: mover los n-1 anillos del auxiliar al destino
    resolver(n - 1, helper, origin, destiny);
  }

  resolver(n, origin, helper, destiny);
  return pasos;
}

// Ejemplo con n=3 (i.e., 3 anillos)
//
// resolver(3, A, B, C)
//   └─ resolver(2, A, C, B)
//        └─ resolver(1, A, B, C) ← primer paso: ring 1 de A → C
//        ← mover ring 2 de A → B
//        └─ resolver(1, C, A, B) ← ring 1 de C → B
//   ← mover ring 3 de A → C
//   └─ resolver(2, B, A, C)
//        └─ resolver(1, B, C, A) ← ring 1 de B → A
//        ← mover ring 2 de B → C
//        └─ resolver(1, A, B, C) ← ring 1 de A → C
