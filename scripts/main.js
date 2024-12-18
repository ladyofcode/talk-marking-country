gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

// create the scrollSmoother before your scrollTriggers
ScrollSmoother.create({
    smooth: 1, // how long (in seconds) it takes to "catch up" to the native scroll position
    effects: true, // looks for data-speed and data-lag attributes on elements
    smoothTouch: 0.1, // much shorter smoothing time on touch devices (default is NO smoothing on touch devices)
});

// Animation for the scrolljacking square
gsap.to('.scrolljacking .square', {
    x: '50vw', // Move the square to the right edge of the viewport
    rotation: 360,
    duration: 2, // Duration of the animation in seconds
    ease: 'none', // Linear movement
    scrollTrigger: {
        trigger: '.scrolljacking', // The element that triggers the animation
        start: 'top bottom', // Start animation when the top of the trigger enters the bottom of the viewport
        end: 'bottom top', // End animation when the bottom of the trigger leaves the top of the viewport
        scrub: true, // Smooth scrubbing effect
        // markers: true, // Enable markers for debugging
    }
});

// Animation for the year elements
gsap.utils.toArray('.year').forEach(year => {
    gsap.from(year, {
        opacity: 0,
        scale: 0.8,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: year,
            start: 'top center+=100', // Start when the top of the element is 100px below the center of the viewport
            end: 'top center-=100', // End when the top of the element is 100px above the center of the viewport
            toggleActions: 'play none none reverse', // Play on enter, reverse on leave
            markers: false // Set to true for debugging
        }
    });
});

// Updated animation for h2 elements (excluding those in references)
gsap.utils.toArray('h2:not(.references h2)').forEach(h2 => {
    gsap.from(h2, {
        opacity: 0,
        x: -50,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: h2,
            start: 'top bottom-=20%', // 20% from the bottom
            toggleActions: 'play none none reverse'
        }
    });
});

// Updated animation for list items (excluding those in references)
gsap.utils.toArray('ul:not(.references ul)').forEach(ul => {
    gsap.from(ul.children, {
        opacity: 0,
        x: -50,
        duration: 1,
        stagger: 1, // 1 second delay between each item
        ease: 'power2.out',
        scrollTrigger: {
            trigger: ul,
            start: 'top bottom-=20%', // 20% from the bottom
            toggleActions: 'play none none reverse'
        }
    });
});

// New animation for snippet h3 elements
gsap.utils.toArray('.snippets h3').forEach(h3 => {
    gsap.from(h3, {
        opacity: 0,
        y: -50,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: h3.closest('.content'),
            start: 'top bottom-=20%',
            toggleActions: 'play none none reverse'
        }
    });
});

// Updated animation for images (excluding those in .collage, references, and snippets)
gsap.utils.toArray('img:not(.collage img, .references img, .snippets img)').forEach(img => {
    gsap.from(img, {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: img,
            start: 'top bottom-=20%',
            toggleActions: 'play none none reverse'
        }
    });
});

// Updated animation for .snippets images
gsap.utils.toArray('.snippets').forEach(snippet => {
    gsap.from(snippet.querySelectorAll('img'), {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power2.out',
        snap: 1,
        scrollTrigger: {
            trigger: snippet,
            start: 'top bottom-=20%',
            toggleActions: 'play none none reverse'
        }
    });
});

// Animation for .collage images
gsap.utils.toArray('.collage').forEach(collage => {
    gsap.from(collage.querySelectorAll('img'), {
        opacity: 0,
        y: 50,
        duration: 1,
        stagger: 1,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: collage,
            start: 'top bottom',
            toggleActions: 'play none none reverse'
        }
    });
});

// Separate animation for .icons
gsap.utils.toArray('.icons').forEach(container => {
    gsap.from(container.children, {
        opacity: 0,
        x: -50,
        duration: 1,
        ease: 'power2.out',
        stagger: 0.3,
        scrollTrigger: {
            trigger: container,
            start: 'top bottom-=20%',
            toggleActions: 'play none none reverse'
        }
    });
});

// Updated animation for .stack images
gsap.utils.toArray('.stack').forEach(container => {
    // Set initial styles to prevent flickering
    gsap.set(container.children, { opacity: 0, x: -50 });

    gsap.to(container.children, {
        opacity: 1,
        x: 0,
        duration: 1.4,
        ease: 'power2.out',
        stagger: 0.3,
        scrollTrigger: {
            trigger: container,
            start: 'top bottom-=20%',
            toggleActions: 'play none none reset' // Changed from 'reverse' to 'reset'
        },
        onComplete: () => {
            // Ensure all children are fully visible after animation
            gsap.set(container.children, { opacity: 1 });
        }
    });
});
