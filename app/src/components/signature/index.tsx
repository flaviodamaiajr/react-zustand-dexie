import { useRef, useEffect, useState } from "react";
import { Typography, Button, Box, Paper } from "@mui/material";
import SignaturePad from "signature_pad";
import { dataURLtoBlob } from "../../helpers/converter";
import { signatureRepo } from "../../db/signature.repo";

export function Signature() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [signaturePad, setSignaturePad] = useState<SignaturePad | null>(null);
  const [isEmpty, setIsEmpty] = useState(true);
  const [savedImageUrl, setSavedImageUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;

    // Corrige DPI / Retina
    const ratio = Math.max(window.devicePixelRatio || 1, 1);
    const width = canvas.offsetWidth;
    const height = 300;

    canvas.width = width * ratio;
    canvas.height = height * ratio;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const ctx = canvas.getContext("2d");
    ctx?.scale(ratio, ratio);

    const pad = new SignaturePad(canvas, {
      penColor: "rgb(0, 0, 0)",
      backgroundColor: "rgb(255, 255, 255)",
    });

    const handleEnd = () => setIsEmpty(pad.isEmpty());

    pad.addEventListener("endStroke", handleEnd);
    setSignaturePad(pad);

    return () => {
      pad.removeEventListener("endStroke", handleEnd);
      pad.off();
    };
  }, []);

  useEffect(() => {
    let objectUrl: string | null = null;

    const loadLastSignature = async () => {
      const last = await signatureRepo.get(1);
      if (!last) return;

      objectUrl = URL.createObjectURL(last.image);
      setSavedImageUrl(objectUrl);
      setIsEmpty(false);
    };

    loadLastSignature();

    return () => {
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, []);

  const handleClear = () => {
    if (!signaturePad) return;
    signaturePad.clear();
    setIsEmpty(true);
  };

  const handleSave = async () => {
    if (!signaturePad || signaturePad.isEmpty()) return;

    const dataUrl = signaturePad.toDataURL("image/png");
    const blob = dataURLtoBlob(dataUrl);

    await signatureRepo.save({
      userId: "user-123",
      image: blob,
      createdAt: new Date(),
      synced: false,
    });

    // mostra no card sem limpar o canvas
    const url = URL.createObjectURL(blob);
    setSavedImageUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return url;
    });
  };

  const handleDelete = async () => {
    await signatureRepo.delete(1);
    setSavedImageUrl(null);
  };

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h6" gutterBottom>
        Signature
      </Typography>

      <Paper
        elevation={1}
        sx={{
          border: "1px solid #ddd",
          backgroundColor: "#fff",
          mb: 2,
          overflow: "hidden",
        }}
      >
        <canvas
          ref={canvasRef}
          style={{
            display: "block",
            width: "100%",
            height: "300px",
            cursor: "crosshair",
            touchAction: "none",
          }}
        />
      </Paper>

      <Box sx={{ display: "flex", gap: 1 }}>
        <Button
          variant="outlined"
          color="secondary"
          onClick={handleClear}
          disabled={isEmpty}
        >
          Clear
        </Button>

        <Button
          variant="contained"
          color="primary"
          onClick={handleSave}
          disabled={isEmpty}
        >
          Save Signature
        </Button>
      </Box>

      {savedImageUrl && (
        <>
          <Paper
            elevation={1}
            sx={{
              border: "1px solid #ddd",
              backgroundColor: "#fff",
              p: 2,
              mt: 3,
              mb: 2
            }}
          >
            <Typography variant="subtitle1" gutterBottom>
              Saved signature
            </Typography>

            <img
              src={savedImageUrl}
              alt="Saved signature"
              style={{
                width: "100%",
                maxHeight: 200,
                objectFit: "contain",
                border: "1px solid #eee",
              }}
            />
          </Paper>

          <Button
            variant="contained"
            color="primary"
            onClick={handleDelete}
            disabled={!savedImageUrl}
          >
            Delete
          </Button>
        </>
      )}
    </Box>
  );
}
