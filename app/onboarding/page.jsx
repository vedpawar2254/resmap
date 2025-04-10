// pages/onboarding.tsx
"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function OnboardingForm() {
  const steps = ["", "Role", "Profile", "Setup", "Confirm"];
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    role: "",
    fullName: "",
    email: "",
    department: "",
    designation: "",
    phone: "",
    setupResources: false,
    selectedResources: [],
  });

  const next = () => setStep((prev) => prev + 1);
  const back = () => setStep((prev) => prev - 1);
  const updateField = (field, value) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  useEffect(() => {
    if (step === 3 && formData.role !== "Department Head") {
      setStep(4);
    }
  }, [step, formData.role]);

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        {step === 1 && (
          <div className="space-y-4">
            <div className="mb-4 flex justify-between">
              {steps.map((s, i) => (
                <div
                  key={s}
                  className={`text-sm font-semibold ${
                    i === step ? "text-blue-600" : "text-gray-400"
                  }`}
                >
                  {s}
                </div>
              ))}
            </div>
            <h2 className="text-xl font-bold mb-2">Select Your Role</h2>
            <RadioGroup
              value={formData.role}
              onValueChange={(val) => updateField("role", val)}
              className="grid grid-cols-1 sm:grid-cols-3 gap-4"
            >
              {["Department Head", "Personnel", "Admin"].map((role) => (
                <Card
                  key={role}
                  className={cn(
                    "p-4 border cursor-pointer hover:shadow-md transition-all",
                    formData.role === role ? "border-blue-500" : ""
                  )}
                  onClick={() => updateField("role", role)}
                >
                  <Label htmlFor={role}>{role}</Label>
                  <p className="text-sm text-muted-foreground mt-1">
                    {role === "Department Head" &&
                      "Manage your department and resources"}
                    {role === "Personnel" &&
                      "Update field data and request resources"}
                    {role === "Admin" &&
                      "Manage users, configs, and audit logs"}
                  </p>
                </Card>
              ))}
            </RadioGroup>
            <Button onClick={next} disabled={!formData.role} className="mt-4">
              Next
            </Button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold">Profile Information</h2>
            <div className="mb-4 flex justify-between">
              {steps.map((s, i) => (
                <div
                  key={s}
                  className={`text-sm font-semibold ${
                    i === step ? "text-blue-600" : "text-gray-400"
                  }`}
                >
                  {s}
                </div>
              ))}
            </div>
            <Input
              placeholder="Full Name"
              value={formData.fullName}
              onChange={(e) => updateField("fullName", e.target.value)}
              required
            />
            <Input
              placeholder="Official Government Email"
              type="email"
              value={formData.email}
              onChange={(e) => updateField("email", e.target.value)}
              required
            />
            <Input
              placeholder="Department"
              value={formData.department}
              onChange={(e) => updateField("department", e.target.value)}
              required
            />
            <Input
              placeholder="Designation"
              value={formData.designation}
              onChange={(e) => updateField("designation", e.target.value)}
              required
            />
            <Input
              placeholder="Phone Number (Optional)"
              value={formData.phone}
              onChange={(e) => updateField("phone", e.target.value)}
            />
            <div className="flex justify-between">
              <Button onClick={back} variant="ghost">
                Back
              </Button>
              <Button
                onClick={next}
                disabled={
                  !formData.fullName ||
                  !formData.email ||
                  !formData.department ||
                  !formData.designation
                }
              >
                Next
              </Button>
            </div>
          </div>
        )}

        {step === 3 && formData.role === "Department Head" && (
          <div className="space-y-4">
            <div className="mb-4 flex justify-between">
              {steps.map((s, i) => (
                <div
                  key={s}
                  className={`text-sm font-semibold ${
                    i === step ? "text-blue-600" : "text-gray-400"
                  }`}
                >
                  {s}
                </div>
              ))}
            </div>
            <h2 className="text-xl font-bold">Department Setup</h2>
            <Label>
              <input
                type="checkbox"
                checked={formData.setupResources}
                onChange={(e) =>
                  updateField("setupResources", e.target.checked)
                }
              />{" "}
              Add initial department resources?
            </Label>
            {formData.setupResources && (
              <div className="flex gap-4 flex-wrap">
                {["Infrastructure", "Personnel", "Digital Assets"].map((r) => (
                  <Card
                    key={r}
                    onClick={() => {
                      const selected = formData.selectedResources.includes(r)
                        ? formData.selectedResources.filter((x) => x !== r)
                        : [...formData.selectedResources, r];
                      updateField("selectedResources", selected);
                    }}
                    className={cn(
                      "p-4 border cursor-pointer w-40 text-center hover:shadow-sm",
                      formData.selectedResources.includes(r)
                        ? "border-blue-500"
                        : ""
                    )}
                  >
                    {r}
                  </Card>
                ))}
              </div>
            )}
            <div className="flex justify-between">
              <Button onClick={back} variant="ghost">
                Back
              </Button>
              <Button onClick={next}>Next</Button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-4">
            <div className="mb-4 flex justify-between">
              {steps.map((s, i) => (
                <div
                  key={s}
                  className={`text-sm font-semibold ${
                    i === step ? "text-blue-600" : "text-gray-400"
                  }`}
                >
                  {s}
                </div>
              ))}
            </div>
            <h2 className="text-xl font-bold">Review and Confirm</h2>

            <div className="bg-muted p-4 rounded">
              <p>
                <strong>Role:</strong> {formData.role}
              </p>
              <p>
                <strong>Name:</strong> {formData.fullName}
              </p>
              <p>
                <strong>Email:</strong> {formData.email}
              </p>
              <p>
                <strong>Department:</strong> {formData.department}
              </p>
              <p>
                <strong>Designation:</strong> {formData.designation}
              </p>
              <p>
                <strong>Phone:</strong> {formData.phone}
              </p>
              {formData.role === "Department Head" &&
                formData.setupResources && (
                  <p>
                    <strong>Initial Resources:</strong>{" "}
                    {formData.selectedResources.join(", ") || "None selected"}
                  </p>
                )}
            </div>
            <div className="flex justify-between">
              <Button onClick={back} variant="ghost">
                Back
              </Button>
              <Button className="bg-green-600 hover:bg-green-700 text-white">
                Submit
              </Button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
