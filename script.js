document.getElementById('paintForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const length = parseFloat(document.getElementById('length').value);
    const width = parseFloat(document.getElementById('width').value);
    const height = parseFloat(document.getElementById('height').value);
    const doors = parseInt(document.getElementById('doors').value) || 0;
    const windows = parseInt(document.getElementById('windows').value) || 0;
    const coats = parseInt(document.getElementById('coats').value);
    const paintCeiling = document.getElementById('paintCeiling').checked;
    const skipOpenings = document.getElementById('skipOpenings').checked;
    
    // Calculate wall perimeter and area
    const perimeter = 2 * (length + width);
    let wallArea = perimeter * height;
    
    // Subtract doors and windows (standard sizes: door = 2m², window = 1.5m²)
    if (skipOpenings) {
        wallArea -= (doors * 2) + (windows * 1.5);
    }
    
    // Add ceiling if checked
    let ceilingArea = 0;
    if (paintCeiling) {
        ceilingArea = length * width;
    }
    
    const totalArea = wallArea + ceilingArea;
    
    // Calculate paint needed (coverage: 10m² per liter per coat is average)
    const coveragePerLiter = 10;
    const litersNeeded = (totalArea / coveragePerLiter) * coats;
    
    // Round up to nearest 0.5L for practical purposes
    const litersRounded = Math.ceil(litersNeeded * 2) / 2;
    
    // Budget estimate: €5-€15 per liter for quality interior paint
    const budgetLow = litersRounded * 5;
    const budgetHigh = litersRounded * 15;
    
    // Display results
    document.getElementById('surfaceOut').textContent = totalArea.toFixed(1) + ' m²';
    document.getElementById('litersOut').textContent = litersRounded + ' L';
    document.getElementById('budgetOut').textContent = budgetLow + '€ - ' + budgetHigh + '€';
    
    // Generate tip
    let tip = '';
    if (litersRounded <= 5) {
        tip = '💡 Un seul seau de peinture suffira ! N’oubliez pas 1-2 rouleaux et un plateau.';
    } else if (litersRounded <= 10) {
        tip = '💡 Prévoyez 2 seaux ou un grand seau de 10L. Pensez au rouleau anti-goutte pour finir vite.';
    } else {
        tip = '💡 Pour cette surface, optez pour un seau de 10L+ et un bon rouleau large (25cm) pour aller plus vite.';
    }
    
    document.getElementById('tipOut').textContent = tip;
    
    // Show results
    document.getElementById('results').hidden = false;
    
    // Scroll to results
    document.getElementById('results').scrollIntoView({ behavior: 'smooth', block: 'start' });
});
