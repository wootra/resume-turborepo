<script>
    const onClick = () => {
        window.open('/pdfgen.pdf', '_blank');
    };
</script>

<div class="w-auto h-full items-center jusitfy-center inline-flex ml-2">
    <button
        class="h-8 flex items-center rounded-lg border-2 border-lime-700 bg-teal-800 shadow-sm text-white text-sm font-semibold p-2"
        on:click={onClick}
        on:keyup={onClick}
    >
        Download PDF
    </button>
</div>
