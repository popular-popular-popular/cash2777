/*
 * database.js
 * -----------------------------------------
 * Capa de datos para el Portal de Pagos DEMO
 *
 * IMPORTANTE:
 * Este archivo utiliza datos locales de demostración.
 * No procesa pagos reales ni consulta servidores.
 *
 * API expuesta (window.Database):
 *   - registros
 *   - formatoCOP(valor)
 *   - buscarPorReferencia(referencia)
 *   - obtenerRegistroPrincipal()
 *   - obtenerHistorial()
 *   - obtenerDetalle(referencia)
 *   - validarReferencia(referencia)
 *   - actualizarMonto(referencia, nuevoMonto)
 *   - simularPago(referencia, monto)
 * -----------------------------------------
 */

const Database = (() => {

    "use strict";

    /* =========================================================
       BASE DE DATOS DEMO
       ========================================================= */

    const registros = [
        {
            referencia: "402026455",
            descripcion: "Registro de demostración",
            nombre: "JESUS DAVID LECHUGA GOMEZ",
            documento: "CC 8650231",
            correo: "Jesusdavidlechuga1@gmail.com",
            total:  88246,
            minimo: 2000,
            estado: "Declinado",
            fechaGeneracion: "2026-10-07 19:00:00",
            fechaVencimiento: "2026-10-07 19:00:00"
        },
        {
            referencia: "DEMO-402026454",
            descripcion: "Registro de demostración",
            nombre: "Usuario de prueba",
            documento: "DOC-000001 (ficticio)",
            correo: "usuario.demo@example.com",
            total: 91200,
            minimo: 2000,
            estado: "Aprobado",
            fechaGeneracion: "2026-10-06 19:00:00",
            fechaVencimiento: "2026-10-13 19:00:00"
        },
        {
            referencia: "DEMO-402026453",
            descripcion: "Registro de demostración",
            nombre: "Usuario de prueba",
            documento: "DOC-000002 (ficticio)",
            correo: "usuario.demo@example.com",
            total: 74500,
            minimo: 2000,
            estado: "Declinado",
            fechaGeneracion: "2026-10-05 19:00:00",
            fechaVencimiento: "2026-10-12 19:00:00"
        },
        {
            referencia: "DEMO-402026452",
            descripcion: "Registro de demostración",
            nombre: "Usuario de prueba",
            documento: "DOC-000003 (ficticio)",
            correo: "usuario.demo@example.com",
            total: 80000,
            minimo: 2000,
            estado: "Aprobado",
            fechaGeneracion: "2026-10-04 19:00:00",
            fechaVencimiento: "2026-10-11 19:00:00"
        }
    ];


    /* =========================================================
       UTILIDADES
       ========================================================= */

    function normalizar(texto) {
        return String(texto || "").trim().toUpperCase();
    }

    function esNumeroValido(valor) {
        return Number.isFinite(Number(valor));
    }


    /* =========================================================
       FORMATO DE MONEDA (COP)
       ========================================================= */

    function formatoCOP(valor) {
        const numero = Number(valor);

        if (!Number.isFinite(numero)) {
            return "COP 0";
        }

        return "COP " + new Intl.NumberFormat("es-CO", {
            maximumFractionDigits: 0
        }).format(numero);
    }


    /* =========================================================
       BUSCAR POR REFERENCIA
       ========================================================= */

    function buscarPorReferencia(referencia) {
        if (!referencia) return null;

        const buscada = normalizar(referencia);

        return registros.find((registro) =>
            normalizar(registro.referencia) === buscada
        ) || null;
    }


    /* =========================================================
       OBTENER REGISTRO PRINCIPAL (el primero)
       ========================================================= */

    function obtenerRegistroPrincipal() {
        return registros[0] || null;
    }


    /* =========================================================
       OBTENER HISTORIAL (todos los registros resumidos)
       ========================================================= */

    function obtenerHistorial() {
        return registros.map((registro) => ({
            referencia: registro.referencia,
            estado: registro.estado,
            total: registro.total,
            descripcion: registro.descripcion,
            fechaGeneracion: registro.fechaGeneracion
        }));
    }


    /* =========================================================
       OBTENER DETALLE DE UN REGISTRO
       ========================================================= */

    function obtenerDetalle(referencia) {
        const registro = buscarPorReferencia(referencia);
        if (!registro) return null;

        return {
            referencia: registro.referencia,
            descripcion: registro.descripcion,
            nombre: registro.nombre,
            documento: registro.documento,
            correo: registro.correo,
            total: registro.total,
            minimo: registro.minimo,
            estado: registro.estado,
            fechaGeneracion: registro.fechaGeneracion,
            fechaVencimiento: registro.fechaVencimiento
        };
    }


    /* =========================================================
       VALIDAR REFERENCIA
       ========================================================= */

    function validarReferencia(referencia) {
        const registro = buscarPorReferencia(referencia);

        return {
            encontrada: registro !== null,
            registro: registro
        };
    }


    /* =========================================================
       ACTUALIZAR MONTO (solo demo)
       ========================================================= */

    function actualizarMonto(referencia, nuevoMonto) {
        const registro = buscarPorReferencia(referencia);

        if (!registro) {
            return {
                correcto: false,
                mensaje: "Referencia no encontrada."
            };
        }

        const monto = Number(nuevoMonto);

        if (!esNumeroValido(monto) || monto < 0) {
            return {
                correcto: false,
                mensaje: "Monto inválido."
            };
        }

        registro.total = monto;

        return {
            correcto: true,
            mensaje: "Monto actualizado en la demostración.",
            registro: registro
        };
    }


    /* =========================================================
       SIMULAR PAGO (no realiza pagos reales)
       ========================================================= */

    function simularPago(referencia, monto) {
        const registro = buscarPorReferencia(referencia);

        if (!registro) {
            return {
                correcto: false,
                mensaje: "Referencia no encontrada."
            };
        }

        const valor = Number(monto);

        if (!esNumeroValido(valor) || valor <= 0) {
            return {
                correcto: false,
                mensaje: "Monto inválido."
            };
        }

        return {
            correcto: true,
            modo: "DEMO",
            mensaje: "Pago simulado correctamente.",
            referencia: registro.referencia,
            monto: valor,
            estado: "SIMULADO"
        };
    }


    /* =========================================================
       API PÚBLICA
       ========================================================= */

    return {
        registros,
        formatoCOP,
        buscarPorReferencia,
        obtenerRegistroPrincipal,
        obtenerHistorial,
        obtenerDetalle,
        validarReferencia,
        actualizarMonto,
        simularPago
    };

})();


/* Exponer en window por si algún script lo usa directo */
window.Database = Database;
