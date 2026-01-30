-- Create profiles table for user information
CREATE TABLE public.profiles (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT,
    email TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view their own profile"
ON public.profiles FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile"
ON public.profiles FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile"
ON public.profiles FOR UPDATE
USING (auth.uid() = user_id);

-- Create pitches table
CREATE TABLE public.pitches (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    city TEXT NOT NULL,
    locality TEXT,
    property_type TEXT NOT NULL CHECK (property_type IN ('residential', 'commercial')),
    client_goal TEXT NOT NULL CHECK (client_goal IN ('investment', 'end-use', 'rental-yield')),
    budget_min NUMERIC,
    budget_max NUMERIC,
    time_horizon INTEGER NOT NULL DEFAULT 5,
    status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'processing', 'completed')),
    market_rate NUMERIC,
    brokerage_rate NUMERIC,
    projected_roi NUMERIC,
    insights JSONB,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on pitches
ALTER TABLE public.pitches ENABLE ROW LEVEL SECURITY;

-- Pitches policies
CREATE POLICY "Users can view their own pitches"
ON public.pitches FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own pitches"
ON public.pitches FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own pitches"
ON public.pitches FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own pitches"
ON public.pitches FOR DELETE
USING (auth.uid() = user_id);

-- Create function for auto-updating timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for timestamp updates
CREATE TRIGGER update_profiles_updated_at
BEFORE UPDATE ON public.profiles
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_pitches_updated_at
BEFORE UPDATE ON public.pitches
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to automatically create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (user_id, email, full_name)
    VALUES (NEW.id, NEW.email, COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)));
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Create trigger for new user signup
CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW
EXECUTE FUNCTION public.handle_new_user();