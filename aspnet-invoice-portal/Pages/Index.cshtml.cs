using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using System.ComponentModel.DataAnnotations;

namespace InvoiceAccessibilityLab.Pages;
public class IndexModel : PageModel
{
    [BindProperty]
    [Required(ErrorMessage = "Customer email is required.")]
    [EmailAddress(ErrorMessage = "Enter a valid email address.")]
    public string CustomerEmail { get; set; } = "";

    public bool IsFixed => !string.Equals(Request.Query["mode"], "broken", StringComparison.OrdinalIgnoreCase);
    public string? SuccessMessage { get; private set; }

    public void OnGet() {}

    public IActionResult OnPost()
    {
        if (!ModelState.IsValid) return Page();
        SuccessMessage = $"Invoice notification prepared for {CustomerEmail}. (Demo only: no email sent.)";
        return Page();
    }
}
