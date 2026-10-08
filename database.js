/*
 * js.database
 * -----------------------------------------
 * Capa de datos para el Portal de Pagos DEMO
 *
 * IMPORTANTE:
 * Este archivo actualmente utiliza datos locales
 * de demostración.
 *
 * Más adelante podemos reemplazar las funciones
 * por consultas a tu base de datos/backend.
 * -----------------------------------------
 */

const Database = (() => {

    /*
     * Base de datos DEMO
     * ------------------
     * Aquí están los registros que actualmente
     * aparecen en el portal.
     */

    const registros = [
        {
            referencia: "DEMO-402026455",
            descripcion: "Registro de demostración",
            nombre: "Usuario de prueba",
            documento: "DOC-000000 (ficticio)",
            correo: "usuario.demo@example.com",
            total: 88246,
            minimo: 2000,
            estado: "Declinado",
            fechaGeneracion: "2026-10-07 19:00:00",
            fechaVencimiento: "2026-10-14 19:00:00"
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


    /*
     * -----------------------------------------
     * FORMATO DE MONEDA
     * -----------------------------------------
     */

    function formatoCOP(valor) {

        const numero = Number(valor);

        if (!Number.isFinite(numero)) {
            return "COP 0";
        }

        return "COP " + new Intl.NumberFormat("es-CO").format(numero);
    }


    /*
     * -----------------------------------------
     * BUSCAR POR REFERENCIA
     * -----------------------------------------
     */

    function buscarPorReferencia(referencia) {

        if (!referencia) {
            return null;
        }

        const referenciaNormalizada =
            String(referencia).trim().toUpperCase();

        return registros.find(registro =>
            registro.referencia.toUpperCase() === referenciaNormalizada
        ) || null;
    }


    /*
     * -----------------------------------------
     * OBTENER REGISTRO PRINCIPAL
     * -----------------------------------------
     */

    function obtenerRegistroPrincipal() {

        return registros[0] || null;
    }


    /*
     * -----------------------------------------
     * OBTENER HISTORIAL
     * -----------------------------------------
     */

    function obtenerHistorial() {

        return registros.map(registro => ({
            referencia: registro.referencia,
            estado: registro.estado,
            total: registro.total,
            descripcion: registro.descripcion,
            fechaGeneracion: registro.fechaGeneracion
        }));

    }


    /*
     * -----------------------------------------
     * OBTENER DETALLE
     * -----------------------------------------
     */

    function obtenerDetalle(referencia) {

        const registro = buscarPorReferencia(referencia);

        if (!registro) {
            return null;
        }

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


    /*
     * -----------------------------------------
     * VALIDAR REFERENCIA
     * -----------------------------------------
     */

    function validarReferencia(referencia) {

        const registro = buscarPorReferencia(referencia);

        return {
            encontrada: registro !== null,
            registro: registro
        };

    }


    /*
     * -----------------------------------------
     * ACTUALIZAR MONTO
     *
     * Esta función existe únicamente para la
     * demostración.
     *
     * En la versión conectada a backend,
     * aquí NO se debería modificar directamente
     * el navegador.
     * -----------------------------------------
     */

    function actualizarMonto(referencia, nuevoMonto) {

        const registro = buscarPorReferencia(referencia);

        if (!registro) {
            return {
                correcto: false,
                mensaje: "Referencia no encontrada."
            };
        }

        const monto = Number(nuevoMonto);

        if (!Number.isFinite(monto) || monto < 0) {
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


    /*
     * -----------------------------------------
     * SIMULAR PAGO
     *
     * NO realiza ningún pago real.
     * -----------------------------------------
     */

    function simularPago(referencia, monto) {

        const registro = buscarPorReferencia(referencia);

        if (!registro) {

            return {
                correcto: false,
                mensaje: "Referencia no encontrada."
            };

        }

        const valor = Number(monto);

        if (!Number.isFinite(valor) || valor <= 0) {

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


    /*
     * -----------------------------------------
     * API INTERNA
     * -----------------------------------------
     */

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
