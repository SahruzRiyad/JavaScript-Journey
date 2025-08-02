(function () {
  console.log("Running corrected and re-runnable script...");

  const donationForms = document.querySelectorAll(
    'form[action*="/Giving/Donate"]'
  );

  if (donationForms.length > 0) {
    donationForms.forEach((form, index) => {
      if (form.__x) {
        form.__x.amountOnce = 1;

        form.__x.amountMonthly = 1;

        console.log(
          `Form ${
            index + 1
          }: Successfully updated component state. The UI should now reflect the second option as default.`
        );
      } else {
        console.warn(
          `Form ${index + 1}: Could not find the Alpine.js data instance.`
        );
      }
    });
  } else {
    console.warn("No donation forms found on the page.");
  }
})();
