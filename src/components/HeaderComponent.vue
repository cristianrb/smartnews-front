<template>
    <div class="headerComponent">
        <!-- HEADER -->
        <header class="fixed-top">
            <div class="container">
                <div class="row">
                    <!-- COLUMNA DEL LOGOTIPO -->
                    <div class="col-8 d-none d-md-block">
                        <h1>Smart News</h1>
                    </div>

                    <!-- COLUMNA DEL MENU DE NAVEGACION DERECHO -->
                    <nav class="col-12 col-sm-3 col-lg-2 order-1 order-sm-2 menu d-flex justify-content-between ml-auto mb-2 mb-sm-0">
                        <a href="#"><img src="../assets/img/new.png" alt=""></a>
                        <a href="#"><img src="../assets/img/quality.png" alt=""></a>
                        <a href="#"><img src="../assets/img/rating.png" alt=""></a>
                    </nav>
                </div>
            </div>
        </header>
    </div>
</template>

<script>
export default {
    name: 'HeaderComponent'
}
</script>