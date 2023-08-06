<script>
    const onClick = () => {
        window.open('/api/pdfgen.pdf', '_blank');
    };
</script>

<div class="w-auto h-fullitems-center jusitfy-center inline-flex ml-2">
    <button
        class=" rounded-lg border-2 border-lime-700 bg-teal-800 shadow-sm text-white text-sm font-semibold p-2"
        on:click={onClick}
        on:keyup={onClick}
    >
        Download PDF
    </button>
</div>
