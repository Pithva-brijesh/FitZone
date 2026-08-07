export function generateCandidates(profile) {

    const candidates = [];

    switch (profile.goal) {

        case "Build Muscle":

            candidates.push(
                "Push Day",
                "Pull Day",
                "Leg Day",
                "Upper Body"
            );

            break;

        case "Lose Weight":

            candidates.push(
                "HIIT",
                "Cardio",
                "Full Body"
            );

            break;

        case "Gain Strength":

            candidates.push(
                "Upper Body Strength",
                "Lower Body Strength",
                "Compound Lifts"
            );

            break;

        default:
            candidates.push(
                "Full Body"
            );
    }

    return candidates;
}