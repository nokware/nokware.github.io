document.querySelectorAll('input[name="form_started_at"]').forEach(function (input) {
  if (!input.value) input.value = Date.now().toString();
});
