namespace eliga.DTO
{
    public sealed record TodoCommand
    {
        public string Text { get; set; } = null!;
        public DateTime CreatedAt { get; set; }
        public DateTime? DeletedAt { get; set; } = null;
    }
}
