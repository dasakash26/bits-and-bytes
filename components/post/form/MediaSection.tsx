import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ImageIcon, Upload, X, Link, Eye } from "lucide-react";

export const MediaSection = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [isImageUrlMode, setIsImageUrlMode] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
        setImageUrl("");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageUrlSubmit = () => {
    if (imageUrl.trim()) {
      setUploadedImage(imageUrl);
      setIsImageUrlMode(false);
    }
  };

  const removeImage = () => {
    setUploadedImage(null);
    setImageUrl("");
    setIsImageUrlMode(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label className="text-base font-semibold">Featured Image</Label>
        <Badge variant="outline" className="text-xs">
          Optional
        </Badge>
      </div>

      {uploadedImage ? (
        // Image Preview
        <div className="relative group">
          <div className="relative overflow-hidden rounded-lg border-2 border-border">
            <img
              src={uploadedImage}
              alt="Featured image preview"
              className="w-full h-48 object-cover"
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={() => {
                    window.open(uploadedImage, '_blank');
                  }}
                  className="bg-white/20 hover:bg-white/30 text-white border-white/30"
                >
                  <Eye className="w-4 h-4" />
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={removeImage}
                  className="bg-red-500/80 hover:bg-red-500 text-white border-red-400"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            This image will be used as the featured image for your article
          </p>
        </div>
      ) : (
        // Upload Options
        <div className="space-y-4">
          {!isImageUrlMode ? (
            // Upload from device
            <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
              <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <ImageIcon className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Upload Featured Image</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Choose an eye-catching image that represents your article
                  </p>
                  <div className="flex gap-2 justify-center">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => document.getElementById('image-upload')?.click()}
                      className="bg-primary/5 hover:bg-primary/10 border-primary/20"
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Upload from Device
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setIsImageUrlMode(true)}
                      className="bg-blue-500/5 hover:bg-blue-500/10 border-blue-500/20"
                    >
                      <Link className="w-4 h-4 mr-2" />
                      Use URL
                    </Button>
                  </div>
                </div>
              </div>
              <Input
                id="image-upload"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>
          ) : (
            // URL input mode
            <div className="space-y-3">
              <div className="flex gap-2">
                <Input
                  placeholder="Enter image URL (https://...)"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="flex-1"
                />
                <Button
                  type="button"
                  onClick={handleImageUrlSubmit}
                  disabled={!imageUrl.trim()}
                  size="sm"
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Add
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsImageUrlMode(false);
                    setImageUrl("");
                  }}
                  size="sm"
                >
                  Cancel
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Make sure the URL points directly to an image file
              </p>
            </div>
          )}

          {/* Image Guidelines */}
          <div className="bg-muted/30 rounded-lg p-4 border border-border/50">
            <h4 className="text-sm font-semibold mb-2 flex items-center">
              <ImageIcon className="w-4 h-4 mr-2 text-primary" />
              Image Guidelines
            </h4>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>• Recommended size: 1200x630px or similar aspect ratio</li>
              <li>• Formats: JPG, PNG, WebP (max 5MB)</li>
              <li>• High quality images perform better on social media</li>
              <li>• Ensure you have rights to use the image</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};
