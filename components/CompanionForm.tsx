"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { subjects } from "@/constants";
import { Textarea } from "@/components/ui/textarea";
import { useUserContext } from "@/contexts/user-context";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useRouter } from "next/navigation";
import CTA from "@/components/CTA";

const CompanionForm = () => {
  const { profile } = useUserContext();
  const router = useRouter();
  const createCompanion = useMutation(api.companions.create);

  const [formData, setFormData] = useState({
    name: "",
    subject: "",
    topic: "",
    voice: "",
    style: "",
    duration: 15,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Companion name is required";
    if (!formData.subject) newErrors.subject = "Subject is required";
    if (!formData.topic.trim()) newErrors.topic = "Topic is required";
    if (!formData.voice) newErrors.voice = "Voice is required";
    if (!formData.style) newErrors.style = "Style is required";
    if (!formData.duration || formData.duration < 1)
      newErrors.duration = "Duration must be at least 1";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const companionId = await createCompanion({
        userId: profile?._id as Id<"users">,
        author: profile?.email as string,
        ...formData,
      });

      if (companionId) {
        router.push(`/companions/${companionId}`);
      } else {
        console.log("Failed to create a companion");
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("Error creating companion:", error);
    }
  };

  return (
    <section className="home-section">
      <div className="w-2/3 max-lg:w-full">
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-2">
            <Label htmlFor="name">Companion name</Label>
            <Input
              id="name"
              name="name"
              placeholder="Enter the companion name"
              value={formData.name}
              onChange={handleChange}
              className={errors.name ? "border-red-500" : ""}
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="subject">Subject</Label>
            <Select
              onValueChange={(value) => handleSelectChange("subject", value)}
              value={formData.subject}
            >
              <SelectTrigger
                className={`w-full ${errors.subject ? "border-red-500" : ""}`}
              >
                <SelectValue placeholder="Select a subject" />
              </SelectTrigger>
              <SelectContent>
                {subjects.map((subject) => (
                  <SelectItem key={subject} value={subject}>
                    {subject}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.subject && (
              <p className="text-sm text-red-500">{errors.subject}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="topic">Topic</Label>
            <Textarea
              id="topic"
              name="topic"
              placeholder="Enter the topic"
              value={formData.topic}
              onChange={handleChange}
              className={errors.topic ? "border-red-500" : ""}
            />
            {errors.topic && (
              <p className="text-sm text-red-500">{errors.topic}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="voice">Voice</Label>
            <Select
              onValueChange={(value) => handleSelectChange("voice", value)}
              value={formData.voice}
            >
              <SelectTrigger
                className={`w-full ${errors.voice ? "border-red-500" : ""}`}
              >
                <SelectValue placeholder="Select a voice" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
              </SelectContent>
            </Select>
            {errors.voice && (
              <p className="text-sm text-red-500">{errors.voice}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="style">Style</Label>
            <Select
              onValueChange={(value) => handleSelectChange("style", value)}
              value={formData.style}
            >
              <SelectTrigger
                className={`w-full ${errors.style ? "border-red-500" : ""}`}
              >
                <SelectValue placeholder="Select a style" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="casual">Casual</SelectItem>
                <SelectItem value="professional">Professional</SelectItem>
                <SelectItem value="friendly">Friendly</SelectItem>
              </SelectContent>
            </Select>
            {errors.style && (
              <p className="text-sm text-red-500">{errors.style}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="duration">Duration (minutes)</Label>
            <Input
              id="duration"
              name="duration"
              type="number"
              min="1"
              placeholder="Enter duration in minutes"
              value={formData.duration}
              onChange={handleChange}
              className={errors.duration ? "border-red-500" : ""}
            />
            {errors.duration && (
              <p className="text-sm text-red-500">{errors.duration}</p>
            )}
          </div>

          <Button type="submit" className="w-full">
            Create Companion
          </Button>
        </form>
      </div>
      <CTA />
    </section>
  );
};

export default CompanionForm;